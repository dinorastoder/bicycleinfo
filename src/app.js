const express = require('express');
const app = express();
const path = require('path');
const BicycleId = require("./BicycleId");
const Field = require("./Field");
const EditTextObject = require("./EditTextObject");
const BicycleInfoViewRepository = require("./BicycleInfoViewRepository");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('views', path.join(__dirname, 'views')); // Set views path
app.use(express.static(path.join(__dirname, 'public'))); // Set public path
app.set('view engine', 'pug'); // Set pug as view engine
app.locals.moment = require('moment');

app.post("/api/bicycle/update", (req, res, next) => {
    var payload = req.body;
    BicycleInfoViewRepository.applyUpdate(payload);
    res.send();
})

app.get("/bicycle/:bicycleId", (req, res, next) => {
    var bicycleId = new BicycleId(req.params.bicycleId);

    var bicycleInfoView = BicycleInfoViewRepository.find(bicycleId);
    if (bicycleInfoView && (bicycleInfoView.status === "not_exist")) {
        res.redirect("/bicycle/"+req.params.bicycleId+"/edit/notes");
    } else {
        res.render('info', bicycleInfoView)
    }
})

app.get("/bicycle/:bicycleId/images", (req, res, next) => {
    res.redirect("/bicycle/"+req.params.bicycleId+"/images/0");
})

app.get("/bicycle/:bicycleId/images/:imageId", (req, res, next) => {
    var bicycleId = new BicycleId(req.params.bicycleId);

    var bicycleInfoView = BicycleInfoViewRepository.find(bicycleId);
    res.render("images", bicycleInfoView);
})

app.get("/bicycle/:bicycleId/edit/:fieldName", (req, res, next) => {
    var bicycleId = new BicycleId(req.params.bicycleId);
    var field = new Field(req.params.fieldName);

    var bicycleInfoView = BicycleInfoViewRepository.find(bicycleId);
    // res.json(bicycleInfoView);
    res.render('editField', new EditTextObject(bicycleInfoView, field));
})

app.get("/bicycle/:bicycleId/edit", (req, res, next) => {
    var bicycleId = new BicycleId(req.params.bicycleId);

    var bicycleInfoView = BicycleInfoViewRepository.find(bicycleId);
    // res.json(bicycleInfoView);
    res.render('edit', bicycleInfoView)
})

app.get("/", (req, res, next) => {
    res.render('index')
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
