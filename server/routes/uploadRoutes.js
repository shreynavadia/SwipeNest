// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('coverPhoto'), async (req, res) => {
  try {
    const file = req.file;
    // Assume we save the file to a storage service or local filesystem
    res.json({ url: `/uploads/${file.filename}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

module.exports = router;
