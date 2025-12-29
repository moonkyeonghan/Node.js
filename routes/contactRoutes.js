const express = require("express");
const router = express.Router();
const {
    getAllContacts, 
    createContact, 
    viewContact, 
    updateContact, 
    deleteContact, 
    addContactForm} = require("../controllers/contactcontroller");

router.route("/").get(getAllContacts);
router.route("/add").get(addContactForm).post(createContact);
router.route("/:id").get(viewContact).put(updateContact).delete(deleteContact);

module.exports = router;