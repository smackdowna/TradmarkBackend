import multer from 'multer';

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).array('files', 10); // Change single() to array()

export default singleUpload;
