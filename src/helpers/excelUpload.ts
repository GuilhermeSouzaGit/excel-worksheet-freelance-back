import multer from "multer";

const excelUpload = () => {
	const storage = multer.memoryStorage();

	return multer({ storage: storage });
};

export { excelUpload };
