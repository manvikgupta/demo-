const fs = require('fs');
const path = require('path');

const colleges = [
  { name: "IIT Bombay", location: "Mumbai", state: "Maharashtra", fees: 1200000, rating: 4.9, placement_percent: 98, established_year: 1958, image_url: "", courses: [] },
  { name: "IIT Delhi", location: "New Delhi", state: "Delhi", fees: 1100000, rating: 4.8, placement_percent: 97, established_year: 1961, image_url: "", courses: [] },
  { name: "IIT Madras", location: "Chennai", state: "Tamil Nadu", fees: 1050000, rating: 4.9, placement_percent: 96, established_year: 1959, image_url: "", courses: [] },
  { name: "IIT Kanpur", location: "Kanpur", state: "Uttar Pradesh", fees: 1150000, rating: 4.8, placement_percent: 95, established_year: 1959, image_url: "", courses: [] },
  { name: "IIT Kharagpur", location: "Kharagpur", state: "West Bengal", fees: 1000000, rating: 4.7, placement_percent: 94, established_year: 1951, image_url: "", courses: [] }
];

const baseColleges = [
  "IIT Roorkee", "IIT Guwahati", "IIT Hyderabad", "NIT Trichy", "NIT Surathkal",
  "NIT Warangal", "NIT Rourkela", "NIT Calicut", "BITS Pilani", "VIT Vellore",
  "Manipal Institute of Technology", "SRM Institute of Science and Technology", "Thapar Institute of Engineering and Technology", "Delhi Technological University (DTU)", "NSUT Delhi",
  "IIIT Hyderabad", "IIIT Delhi", "IIIT Allahabad", "IIIT Bangalore", "RV College of Engineering, Bangalore",
  "BMS College of Engineering", "MS Ramaiah Institute of Technology", "PSG College of Technology", "College of Engineering, Pune (COEP)", "VJTI Mumbai",
  "Sardar Patel Institute of Technology", "KJ Somaiya College of Engineering", "PICT Pune", "VIT Pune", "MIT WPU Pune",
  "LD College of Engineering", "Nirma University", "DA-IICT Gandhinagar", "Jadavpur University", "IEM Kolkata",
  "Heritage Institute of Technology", "KIIT Bhubaneswar", "ITER Bhubaneswar", "UPES Dehradun", "Graphic Era University",
  "Chandigarh University", "Chitkara University", "LPU Jalandhar", "Amity University, Noida", "Jaypee Institute of Information Technology"
];

const states = ["Uttarakhand", "Assam", "Telangana", "Tamil Nadu", "Karnataka", "Telangana", "Odisha", "Kerala", "Rajasthan", "Tamil Nadu", "Karnataka", "Tamil Nadu", "Punjab", "Delhi", "Delhi", "Telangana", "Delhi", "Uttar Pradesh", "Karnataka", "Karnataka", "Karnataka", "Karnataka", "Tamil Nadu", "Maharashtra", "Maharashtra", "Maharashtra", "Maharashtra", "Maharashtra", "Maharashtra", "Maharashtra", "Gujarat", "Gujarat", "Gujarat", "West Bengal", "West Bengal", "West Bengal", "Odisha", "Odisha", "Uttarakhand", "Uttarakhand", "Punjab", "Punjab", "Punjab", "Uttar Pradesh", "Uttar Pradesh"];
const locations = ["Roorkee", "Guwahati", "Hyderabad", "Tiruchirappalli", "Surathkal", "Warangal", "Rourkela", "Calicut", "Pilani", "Vellore", "Manipal", "Chennai", "Patiala", "Delhi", "Delhi", "Hyderabad", "Delhi", "Prayagraj", "Bangalore", "Bangalore", "Bangalore", "Bangalore", "Coimbatore", "Pune", "Mumbai", "Mumbai", "Mumbai", "Pune", "Pune", "Pune", "Ahmedabad", "Ahmedabad", "Gandhinagar", "Kolkata", "Kolkata", "Kolkata", "Bhubaneswar", "Bhubaneswar", "Dehradun", "Dehradun", "Chandigarh", "Chandigarh", "Jalandhar", "Noida", "Noida"];

for(let i = 0; i < baseColleges.length; i++) {
  const isGovt = baseColleges[i].includes('IIT') || baseColleges[i].includes('NIT') || baseColleges[i].includes('IIIT') || baseColleges[i].includes('DTU') || baseColleges[i].includes('NSUT') || baseColleges[i].includes('VJTI') || baseColleges[i].includes('COEP') || baseColleges[i].includes('Jadavpur');
  
  colleges.push({
    name: baseColleges[i],
    location: locations[i],
    state: states[i],
    fees: isGovt ? 800000 + Math.floor(Math.random() * 400000) : 1200000 + Math.floor(Math.random() * 1000000),
    rating: 3.8 + Math.random() * 1.0,
    placement_percent: isGovt ? 85 + Math.floor(Math.random() * 15) : 75 + Math.floor(Math.random() * 20),
    established_year: 1940 + Math.floor(Math.random() * 70),
    description: `${baseColleges[i]} is a premier technical institution located in ${locations[i]}, ${states[i]}. It offers a wide range of undergraduate and postgraduate programs.`,
    image_url: "",
    courses: ["B.Tech in Computer Science", "B.Tech in Electronics", "B.Tech in Mechanical"]
  });
}

for (let i = 0; i < 5; i++) {
  colleges[i].description = `${colleges[i].name} is a globally recognized institution known for its excellence in engineering education and research.`;
  colleges[i].courses = ["B.Tech in Computer Science", "B.Tech in Electrical", "B.Tech in Mechanical", "B.Tech in Civil"];
}

colleges.forEach(c => c.rating = Math.round(c.rating * 10) / 10);

const imageList = [
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595113316349-9441215b809a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800&auto=format&fit=crop"
];
colleges.forEach((c, idx) => {
    c.image_url = imageList[idx % imageList.length];
});

fs.writeFileSync(path.join(__dirname, 'seedData.json'), JSON.stringify(colleges, null, 2));
console.log('Successfully generated seedData.json with 50 colleges');
