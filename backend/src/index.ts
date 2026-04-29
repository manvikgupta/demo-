import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(cors({
     origin: ['https://demo-chi-tan.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key_here';

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- COLLEGE ROUTES ---
app.get('/api/colleges', async (req, res) => {
  try {
    const { search, location, minFees, maxFees, page = 1, limit = 10 } = req.query;
    
    const where: any = {};
    if (search) where.name = { contains: String(search), mode: 'insensitive' };
    if (location) where.location = { contains: String(location), mode: 'insensitive' };
    if (minFees || maxFees) {
      where.fees = {};
      if (minFees) where.fees.gte = Number(minFees);
      if (maxFees) where.fees.lte = Number(maxFees);
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { rating: 'desc' }
      }),
      prisma.college.count({ where })
    ]);

    res.json({
      data: colleges,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/colleges/:id', async (req, res) => {
  try {
    const college = await prisma.college.findUnique({
      where: { id: req.params.id },
      include: { reviews: true }
    });
    if (!college) return res.status(404).json({ error: 'College not found' });
    
    // Mock reviews if none exist
    if (college.reviews.length === 0) {
      college.reviews = [
        { id: '1', author: 'Rahul K.', rating: 4.5, text: 'Great infrastructure and amazing faculty!', collegeId: college.id, createdAt: new Date() },
        { id: '2', author: 'Sneha M.', rating: 4.0, text: 'Placements are top-notch, highly recommended.', collegeId: college.id, createdAt: new Date() }
      ] as any;
    }
    
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- SAVED COLLEGES ROUTES ---
app.get('/api/saved', authenticateToken, async (req: any, res) => {
  try {
    const saved = await prisma.savedCollege.findMany({
      where: { userId: req.user.userId },
      include: { college: true }
    });
    res.json(saved.map(s => s.college));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/saved', authenticateToken, async (req: any, res) => {
  try {
    const { collegeId } = req.body;
    const saved = await prisma.savedCollege.create({
      data: {
        userId: req.user.userId,
        collegeId
      }
    });
    res.json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Could not save college or already saved' });
  }
});

app.delete('/api/saved/:collegeId', authenticateToken, async (req: any, res) => {
  try {
    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: req.user.userId,
          collegeId: req.params.collegeId
        }
      }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Could not unsave college' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
