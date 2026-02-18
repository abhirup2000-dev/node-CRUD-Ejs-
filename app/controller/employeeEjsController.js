const Employee = require("../models/employee");
const fs = require("fs");

class employeeEjsController {
  async list(req, res) {
    try {
      const data = await Employee.find();
      res.render("employee/list", {
        title: "employee List page",
        employee: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async add(req, res) {
    try {
      res.render("employee/add", {
        title: "employee add page",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async store(req, res) {
    try {
      const {
        name,
        employee_id,
        contact: { phone, email, address, full_address, city },
        department: { department_name },
        image,
      } = req.body;

      const data = new Employee({
        name,
        employee_id,
        contact: {
          phone,
          email,
          address,
          full_address,
          city,
        },
        department: { department_name },
        image,
      });

      if (req.file) {
        data.image = req.file.path;
        const save = await data.save();
        if (save) {
          res.redirect("/employee/list");
        } else {
          res.redirect("/employee/add");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const employee = await Employee.findById(id);
      if (employee && employee.image) {
        fs.unlink(employee.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("file deleted");
          }
        });
      }
      await Employee.findByIdAndDelete(id);

      res.redirect("/employee/list");
    } catch (err) {
      console.log(err);
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const employee = await Employee.findById(id);
      res.render("employee/edit", {
        title: "Edit employee",
        data: employee,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const employee = await Employee.findById(id);
      if (req.file) {
        if (employee && employee.image && employee.image !== "image.jpg") {
          const imagePath = employee.image;
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        req.body.image = req.file.path;
      }
      const update = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (update) {
        res.redirect("/employee/list");
      } else {
        res.redirect("/employee/edit");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new employeeEjsController();
