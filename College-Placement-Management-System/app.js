const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const PORT = 4000;

// Handlebars Configuration
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: false
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Sample Data
const students = [
  {
    id: 101,
    name: "Rahul Sharma",
    course: "B.Sc. IT",
    skills: "JavaScript, Node.js, SQL",
    available: true
  },
  {
    id: 102,
    name: "Priya Patil",
    course: "B.Sc. Computer Science",
    skills: "Python, Java, MySQL",
    available: true
  },
  {
    id: 103,
    name: "Amit Verma",
    course: "BCA",
    skills: "HTML, CSS, JavaScript",
    available: false
  }
];

const companies = [
  {
    id: 1,
    name: "TechNova Solutions",
    location: "Mumbai",
    industry: "Information Technology"
  },
  {
    id: 2,
    name: "CloudWorks India",
    location: "Pune",
    industry: "Cloud Computing"
  },
  {
    id: 3,
    name: "DataSphere Technologies",
    location: "Bangalore",
    industry: "Data Engineering"
  }
];

const jobs = [
  {
    id: 501,
    title: "Junior Node.js Developer",
    companyId: 1,
    location: "Mumbai",
    type: "Full Time",
    openings: 3
  },
  {
    id: 502,
    title: "Cloud Support Intern",
    companyId: 2,
    location: "Pune",
    type: "Internship",
    openings: 5
  },
  {
    id: 503,
    title: "Database Developer",
    companyId: 3,
    location: "Bangalore",
    type: "Full Time",
    openings: 2
  }
];

// HOME ROUTE - Placement Home
app.get("/", (req, res) => {
  res.status(200).render("home", {
    title: "Placement Home"
  });
});

// COMPANIES ROUTE - Display participating companies
app.get("/companies", (req, res) => {
  res.status(200).render("companies", {
    title: "Companies",
    companies: companies
  });
});

// COMPANY DYNAMIC ROUTE - company details and job openings
app.get("/company/:id", (req, res) => {
  const id = Number(req.params.id);
  const company = companies.find(
    company => company.id === id
  );

  if (!company) {
    return res.status(404).send(`
      <h1>404 - Company Not Found</h1>
      <p>No company exists with ID ${id}.</p>
      <a href="/companies">Back to Companies</a>
    `);
  }

  const companyJobs = jobs.filter(
    job => job.companyId === id
  );

  res.status(200).render("company", {
    title: company.name,
    company: company,
    jobs: companyJobs
  });
});

// STUDENTS ROUTE - Display registered students
app.get("/students", (req, res) => {
  res.status(200).render("students", {
    title: "Students",
    students: students
  });
});

// STUDENT DYNAMIC ROUTE - student placement details
app.get("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(
    student => student.id === id
  );

  if (!student) {
    return res.status(404).send(`
      <h1>404 - Student Not Found</h1>
      <p>No student exists with ID ${id}.</p>
      <a href="/students">Back to Students</a>
    `);
  }

  res.status(200).render("student", {
    title: student.name,
    student: student
  });
});

// JOBS BY COMPANY ROUTE - jobs offered by a particular company
app.get("/jobs/:company", (req, res) => {
  const companyId = Number(req.params.company);
  const company = companies.find(
    company => company.id === companyId
  );

  if (!company) {
    return res.status(404).send(`
      <h1>404 - Company Not Found</h1>
      <p>No company exists with ID ${companyId}.</p>
      <a href="/companies">Back to Companies</a>
    `);
  }

  const companyJobs = jobs.filter(
    job => job.companyId === companyId
  );

  res.status(200).render("jobs", {
    title: `Jobs - ${company.name}`,
    company: company,
    jobs: companyJobs
  });
});

// 404 ROUTE
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The requested route does not exist.</p>
    <a href="/">Go Home</a>
  `);
});

// START SERVER
app.listen(PORT, () => {
  console.log(
    `Express application running at http://localhost:${PORT}`
  );
});
