const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());

const Employe= require('./models/Employe.js');
const Project= require('./models/Project.js');
const ProjectAssigment = require('./models/ProjectAssigment.js'); 

const{CONNECTION_URL} = process.env;
mongoose.connect(CONNECTION_URL) 
.then(() =>{
    console.log('connected to DB \n');
    console.log('conncted to: ', CONNECTION_URL);
}).catch((err) =>{
    console.error("connection to DB failed!", err);
});

//all gets
server.get('/api/employes', async (req, res) => {
    try{
      const allEmployes = await Employe.find();
      res.status(200).json(allEmployes);
    }
    catch (err){
      res.status(500).json({message: "error retrieving employes (GET)" + err.message});
    }
    });
    
    server.get('/api/projects', async (req, res) => {
      try{
        const allProjects = await Project.find();
        res.status(200).json(allProjects);
      }
      catch (err){
        res.status(500).json({message: "error retrieving projects (GET)" + err.message});
      }
    });
    
    server.get('/api/projectassigments', async (req, res) => {
      try{
        const allProjectsAssigments = await ProjectAssigment.find();
        res.status(200).json(allProjectsAssigments);
      }
      catch (err){
        res.status(500).json({message: "error retrieving Projects Assigments (GET)" + err.message});
      }
    });

    //POST APIs
server.post('/api/employes', async (req, res) => {
    console.log("POST /api/employes callled", req.body); //debug
    
    //check for uniqueness 
    try{
      const existingEmploye = await Employe.findOne({employeId: req.body.employeId});
      if (existingEmploye){
        return res.status(400).json({message: "error: id already exists"});
      }
    
      const newEmploye = new Employe({
        employeId: req.body.employeId,
        name: req.body.name,
        email: req.body.email,
        hashedPass: req.body.hashedPass
      });
      await newEmploye.save();
      res.status(201).json(newEmploye);
      console.log("new employe created: ", newEmploye); //debug
    }
    catch (err){
      res.status(500).json({message: "error creating new employe (POST)" + err.message});
    }
    });
    
    server.post('/api/projects', async (req, res) => {
      console.log("POST /api/projects callled"); //debug
    
      //check for uniqueness
      try{
        const existingProject = await Project.findOne({projectId: req.body.projectId});
        if (existingProject){
          return res.status(400).json({message: "error: projectid already exists"});
        }
        const newProject = new Project({
          projectId: req.body.projectId,
          name: req.body.name,
          description: req.body.description
        });
        await newProject.save();
        res.status(201).json(newProject);
        console.log("new project created: ", newProject); //debug
      }
        catch (err){
          res.status(500).json({message: "error creating new project (POST)" + err.message});
        } 
    });
    
    server.post('/api/projectassigments', async (req, res) => {
      console.log("POST /api/projectassigments callled"); //debug
    
      //check if emplyee and project exist
      try{
        const existingEmploye = await Employe.findOne({employeId: req.body.employeId});
        const existingProject = await Project.findOne({projectId: req.body.projectId});
        const exist = existingEmploye && existingProject;
    
        if (!exist){
          return res.status(400).json({message: "error: employee or project doesnot exist"});
        }
    
        const newProjectAssigment = new ProjectAssigment({
          employeId: req.body.employeId,
          projectId: req.body.projectId,
          startDate: req.body.startDate
        })
        await newProjectAssigment.save();
        res.status(201).json(newProjectAssigment);
        console.log("new project assigment created: ", newProjectAssigment); //debug
      } 
      catch (err){
        res.status(500).json({message: "error creating new project assigment (POST)" + err.message});
        
      }
    });

    server.get('/', (req, res) => { //debug
        res.send("server is running");
      });
    server.listen(5000, () => {
        console.log(`------------------  \nserver running on port 5000  \n`);
      });