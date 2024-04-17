import Contact from "../models/contact.model.js";

export const createContact = async (req, res) => {
    try {
      const {name, url, image, description } = req.body;
  
    const newContact = new Contact({
      name,
      url,
      image,
      description 
    });
    const savedContact = await newContact.save();
    res.json(savedContact);
    } catch (error) {
      return res.status(500).json({message:"Something went wrong"});
    }
  };

  export const getContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };