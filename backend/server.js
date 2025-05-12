const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/uploads', express.static('../Admin_Panel/backend/uploads'));

const path = require("path");
// app.use("/uploads", express.static(path.join(__dirname, "../../Admin_Panel/backend/uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const studentRoutes = require('./routes/studentRoutes');
app.use('/api/student', studentRoutes);
const homeworkRoutes = require('./routes/homeworkRoutes');
app.use('/api/student', homeworkRoutes); 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
