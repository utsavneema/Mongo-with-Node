const XLSX = require('xlsx')
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const test_products = require("../models/productModel")


async function fileUpload(req, res) {
    try {
        const file1 = req.files.userfile
        const fileName = file1.name
        // const fileName = parseInt(Math.random() * 100000);
        const path = fileName;
        file1.mv("./excelsheets/" + fileName);

        return res.status(200).json({ status: true, message: "success", file1, path });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "An error occurred" });
    }
}
//---------------------------------------------------------------------------------------------------------------
async function productsInsert(req, res) {
    try {
        const file1 = req.files.userfile;
    const fileName = file1.name;
    const filePath = "./excelsheets/" + fileName;
    await new Promise((resolve, reject) => {
      file1.mv(filePath, (err) => {
        resolve();
      });
    });


        const workbook = XLSX.readFile(filePath);
        // console.log("File has been read successfully");
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        const productDetails = [];

        for (let i = 0; i < sheetData.length; i++) {
            const row = sheetData[i];
            const productId = row["1"];
            const url = `https://dummyjson.com/products/${productId}`;
            const response = await axios.get(url);

            if (response.status === 200) {
                const productData = response.data;
                // if (!response.message === "Response timeout") {
                if (productData && productData.id) {
                    
                    async function saveImages(productData) {
                        const arrayFilenames = [];
                        const thumbnailUrl = productData.thumbnail;
                        const thumbnailFilename = await downloadImage(thumbnailUrl);
                    
                        for (let i = 0; i < productData.images.length; i++) {
                            const imageUrl = productData.images[i];
                            const savedFilename = await downloadImage(imageUrl);
                            if (savedFilename) {
                                arrayFilenames.push(savedFilename);
                            }
                        }
                    
                        return {
                            arrayFilenames,
                            thumbnail: thumbnailFilename,
                        };
                    }
                    
                    async function downloadImage(imageUrl) {
                        try {
                            const response = await axios.get(imageUrl, { responseType: 'stream' });
                            const fileExtension = path.extname(imageUrl);
                            const randomNumber = Math.floor(Math.random() * 10000);
                            const filename = `${randomNumber}${fileExtension}`;
                            const imagePath = path.join('./images/', filename);
                            response.data.pipe(fs.createWriteStream(imagePath));
                            return new Promise((resolve, reject) => {
                                response.data.on('end', () => resolve(filename));
                                response.data.on('error', (err) => reject(err));
                            });
                        } catch (error) {
                            console.error(`Error downloading image ${imageUrl}: ${error.message}`);
                            return null;
                        }
                    }

                    const savedImageNames = await saveImages(productData);
                    const data = new test_products({
                        id: productData.id,
                        title: productData.title,
                        description: productData.description,
                        price: productData.price,
                        discountPercentage: productData.discountPercentage,
                        rating: productData.rating,
                        stock: productData.stock,
                        brand: productData.brand,
                        category: productData.category,
                        thumbnail: savedImageNames.thumbnail,
                        images: savedImageNames.arrayFilenames,
                    });
                   
                    await data.save();
                    console.log(`Product with id ${productData.id} saved`);
                    productDetails.push(data);
                } else {
                    console.error(`Invalid product data for productId ${productId}`);
                }
                // }

            } else {
                console.error(`Failed to fetch data for productId ${productId}. Status code: ${response.status}`);
            }
        }

        return res.status(200).json({ status: true, message: "Data saved successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "An error occurred" });
    }
}
//--------------------------------------------------------------------------------------------------------------

module.exports = { fileUpload, productsInsert };