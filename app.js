// App JS
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'c237_snoopyland'
});

connection.connect((err) => {
if (err) {
console.error('Error connecting to MySQL:', err);
return;
}
console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');

// enable static files
app.use(express.static('public'));

// enable form processing
app.use(express.urlencoded({
    extended: false
}));

// enable static files
app.use(express.static('public'))

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

// Search -------------------------------------------
app.get('/search', (req, res) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.redirect('/');
  }

  const sql = `
    SELECT clothingId AS productId, clothingName AS productName, clothingImage AS productImage, clothingPrice AS productPrice, 'Clothing' AS category FROM clothing WHERE clothingName LIKE ?
    UNION ALL
    SELECT accessoriesId AS productId, accessoriesName AS productName, accessoriesImage AS productImage, accessoriesPrice AS productPrice, 'Accessories' AS category FROM accessories WHERE accessoriesName LIKE ?
    UNION ALL
    SELECT drinkwareId AS productId, drinkwareName AS productName, drinkwareImage AS productImage, drinkwarePrice AS productPrice, 'Drinkware' AS category FROM drinkware WHERE drinkwareName LIKE ?
    UNION ALL
    SELECT charlieId AS productId, charlieName AS productName, charlieImage AS productImage, charliePrice AS productPrice, 'Charlie Brown' AS category FROM charliebrown WHERE charlieName LIKE ?
    UNION ALL
    SELECT snoopyId AS productId, snoopyName AS productName, snoopyImage AS productImage, snoopyPrice AS productPrice, 'Snoopy' AS category FROM snoopy WHERE snoopyName LIKE ?
    UNION ALL
    SELECT woodstockId AS productId, woodstockName AS productName, woodstockImage AS productImage, woodstockPrice AS productPrice, 'Woodstock' AS category FROM woodstock WHERE woodstockName LIKE ?`;

  const queryParam = `%${searchQuery}%`;
  const queryParams = [queryParam, queryParam, queryParam, queryParam, queryParam, queryParam];

  connection.query(sql, queryParams, (error, results) => {
    if (error) {
      console.error('Error retrieving search results:', error);
      res.status(500).send('Error retrieving search results');
    } else {
      // Use a Map to ensure unique results based on productId
      const uniqueResultsMap = new Map();
      results.forEach(result => {
        uniqueResultsMap.set(result.productId, result);
      });

      const uniqueResults = Array.from(uniqueResultsMap.values());

      res.render('searchResult', { results: uniqueResults, searchQuery });
    }
  });
});

// Clothings -------------------------------------------
app.get('/clothing', (req, res) => {
    let sql = 'SELECT * FROM clothing';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving clothing:", error);
        res.status(500).send('Error retrieving clothing');
      } else {
        res.render('clothing', { clothing: results });
      }
    });
  });

app.get('/clothing/:id', (req, res) => {
    const clothingId = req.params.id;
    const sql = 'SELECT * FROM clothing WHERE clothingId = ?';
    connection.query(sql, [clothingId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving clothing by ID');
        }
        if (results.length > 0) {
            res.render('clothingDetail', { clothing: results[0] });
        } else {
            res.status(404).send('Clothing not found');
        }
    });
});

app.get('/addClothing', (req, res) => {
    res.render('addClothing');
});

app.post('/addClothing', upload.single('clothingImage'), (req, res) => {
    const { clothingName, clothingPrice } = req.body;
    let clothingImage;
    if (req.file) {
        clothingImage = req.file.filename;
    } else {
        clothingImage = null;
    }
 
    const sql = 'INSERT INTO clothing (clothingName, clothingPrice, clothingImage) VALUES (?, ?, ?)';
    connection.query( sql, [ clothingName, clothingPrice, clothingImage ], (error, results) => {
        if (error) {
            console.error('Error adding clothing:', error);
            res.status(500).send('Error adding clothing');
        } else {
            res.redirect('/clothing');
        }
    });
});

app.get('/editClothing/:id', (req, res) => {
    const clothingId = req.params.id;
    const sql = 'SELECT * FROM clothing WHERE clothingId = ?';
 
    connection.query( sql, [clothingId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving clothing by ID');
        }
        if (results.length > 0) {
            res.render('editClothing', { clothing: results[0] });
        } else {
            res.status(404).send('Clothing not found');
        }
    });
});
 
app.post('/editClothing/:id', upload.single('image'), (req, res) => {
    const clothingId = req.params.id;
    const { clothingName, clothingPrice } = req.body;
    let clothingImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        clothingImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE clothing SET clothingName = ? , clothingPrice = ?, clothingImage = ? WHERE clothingId = ?';
 
    connection.query( sql, [clothingName, clothingPrice, clothingImage, clothingId], (error, results) => {
        if (error) {
            console.error('Error updating clothing:', error);
            res.status(500).send('Error updating clothing');
        } else {
            res.redirect('/clothing');
        }
    });
});

app.get('/deleteClothing/:id', (req, res) => {
    const clothingId = req.params.id;
    const sql = 'DELETE FROM clothing WHERE clothingId = ?';
    connection.query( sql, [clothingId], (error, results) => {
        if (error) {
            console.error("Error deleting clothing:", error);
            res.status(500).send('Error deleting clothing');
        } else {
            res.redirect('/clothing');
        }
    })
})

// Accessories -------------------------------------------
app.get('/accessories', (req, res) => {
    let sql = 'SELECT * FROM accessories';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving accessories:", error);
        res.status(500).send('Error retrieving accessories');
      } else {
        res.render('accessories', { accessories: results });
      }
    });
  });

app.get('/accessories/:id', (req, res) => {
    const accessoriesId = req.params.id;
    const sql = 'SELECT * FROM accessories WHERE accessoriesId = ?';
    connection.query(sql, [accessoriesId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving accessories by ID');
        }
        if (results.length > 0) {
            res.render('accessoriesDetail', { accessories: results[0] });
        } else {
            res.status(404).send('Accessories not found');
        }
    });
});

app.get('/addAccessories', (req, res) => {
    res.render('addAccessories');
});

app.post('/addAccessories', upload.single('accessoriesImage'), (req, res) => {
    const { accessoriesName, accessoriesPrice } = req.body;
    let accessoriesImage;
    if (req.file) {
        accessoriesImage = req.file.filename;
    } else {
        accessoriesImage = null;
    }
 
    const sql = 'INSERT INTO accessories (accessoriesName, accessoriesPrice, accessoriesImage) VALUES (?, ?, ?)';
    connection.query( sql, [ accessoriesName, accessoriesPrice, accessoriesImage ], (error, results) => {
        if (error) {
            console.error('Error adding accessories:', error);
            res.status(500).send('Error adding accessories');
        } else {
            res.redirect('/accessories');
        }
    });
});

app.get('/editAccessories/:id', (req, res) => {
    const accessoriesId = req.params.id;
    const sql = 'SELECT * FROM accessories WHERE accessoriesId = ?';
 
    connection.query( sql, [accessoriesId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving accessories by ID');
        }
        if (results.length > 0) {
            res.render('editAccessories', { accessories: results[0] });
        } else {
            res.status(404).send('Accessories not found');
        }
    });
});
 
app.post('/editAccessories/:id', upload.single('image'), (req, res) => {
    const accessoriesId = req.params.id;
    const { accessoriesName, accessoriesPrice } = req.body;
    let accessoriesImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        accessoriesImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE accessories SET accessoriesName = ? , accessoriesPrice = ?, accessoriesImage = ? WHERE accessoriesId = ?';
 
    connection.query( sql, [accessoriesName, accessoriesPrice, accessoriesImage, accessoriesId], (error, results) => {
        if (error) {
            console.error('Error updating accessories:', error);
            res.status(500).send('Error updating accessories');
        } else {
            res.redirect('/accessories');
        }
    });
});

app.get('/deleteAccessories/:id', (req, res) => {
    const accessoriesId = req.params.id;
    const sql = 'DELETE FROM accessories WHERE accessoriesId = ?';
    connection.query( sql, [accessoriesId], (error, results) => {
        if (error) {
            console.error("Error deleting accessories:", error);
            res.status(500).send('Error deleting accessories');
        } else {
            res.redirect('/accessories');
        }
    })
})

// Drinkware -------------------------------------------
app.get('/drinkware', (req, res) => {
    let sql = 'SELECT * FROM drinkware';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving drinkware:", error);
        res.status(500).send('Error retrieving drinkware');
      } else {
        res.render('drinkware', { drinkware: results });
      }
    });
  });

app.get('/drinkware/:id', (req, res) => {
    const drinkwareId = req.params.id;
    const sql = 'SELECT * FROM drinkware WHERE drinkwareId = ?';
    connection.query(sql, [drinkwareId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving drinkware by ID');
        }
        if (results.length > 0) {
            res.render('drinkwareDetail', { drinkware: results[0] });
        } else {
            res.status(404).send('drinkware not found');
        }
    });
});

app.get('/addDrinkware', (req, res) => {
    res.render('addDrinkware');
});

app.post('/addDrinkware', upload.single('drinkwareImage'), (req, res) => {
    const { drinkwareName, drinkwarePrice } = req.body;
    let drinkwareImage;
    if (req.file) {
        drinkwareImage = req.file.filename;
    } else {
        drinkwareImage = null;
    }
 
    const sql = 'INSERT INTO drinkware (drinkwareName, drinkwarePrice, drinkwareImage) VALUES (?, ?, ?)';
    connection.query( sql, [ drinkwareName, drinkwarePrice, drinkwareImage ], (error, results) => {
        if (error) {
            console.error('Error adding drinkware:', error);
            res.status(500).send('Error adding drinkware');
        } else {
            res.redirect('/drinkware');
        }
    });
});

app.get('/editDrinkware/:id', (req, res) => {
    const drinkwareId = req.params.id;
    const sql = 'SELECT * FROM drinkware WHERE drinkwareId = ?';
 
    connection.query( sql, [drinkwareId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving drinkware by ID');
        }
        if (results.length > 0) {
            res.render('editDrinkware', { drinkware: results[0] });
        } else {
            res.status(404).send('Drinkware not found');
        }
    });
});
 
app.post('/editDrinkware/:id', upload.single('image'), (req, res) => {
    const drinkwareId = req.params.id;
    const { drinkwareName, drinkwarePrice } = req.body;
    let drinkwareImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        drinkwareImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE drinkware SET drinkwareName = ? , drinkwarePrice = ?, drinkwareImage = ? WHERE drinkwareId = ?';
 
    connection.query( sql, [drinkwareName, drinkwarePrice, drinkwareImage, drinkwareId], (error, results) => {
        if (error) {
            console.error('Error updating drinkware:', error);
            res.status(500).send('Error updating drinkware');
        } else {
            res.redirect('/drinkware');
        }
    });
});

app.get('/deleteDrinkware/:id', (req, res) => {
    const drinkwareId = req.params.id;
    const sql = 'DELETE FROM drinkware WHERE drinkwareId = ?';
    connection.query( sql, [drinkwareId], (error, results) => {
        if (error) {
            console.error("Error deleting drinkware:", error);
            res.status(500).send('Error deleting drinkware');
        } else {
            res.redirect('/drinkware');
        }
    })
})

// Charlie Brown -------------------------------------------
app.get('/charliebrown', (req, res) => {
    let sql = 'SELECT * FROM charliebrown';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving product:", error);
        res.status(500).send('Error retrieving product');
      } else {
        res.render('charliebrown', { charliebrown: results });
      }
    });
  });

app.get('/charliebrown/:id', (req, res) => {
    const charlieId = req.params.id;
    const sql = 'SELECT * FROM charliebrown WHERE charlieId = ?';
    connection.query(sql, [charlieId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('charlieDetail', { charliebrown: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.get('/addCharlie', (req, res) => {
    res.render('addCharlie');
});

app.post('/addCharlie', upload.single('charlieImage'), (req, res) => {
    const { charlieName, charliePrice } = req.body;
    let charlieImage;
    if (req.file) {
        charlieImage = req.file.filename;
    } else {
        charlieImage = null;
    }
 
    const sql = 'INSERT INTO charliebrown (charlieName, charliePrice, charlieImage) VALUES (?, ?, ?)';
    connection.query( sql, [ charlieName, charliePrice, charlieImage ], (error, results) => {
        if (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Error adding product');
        } else {
            res.redirect('/charliebrown');
        }
    });
});

app.get('/editCharlie/:id', (req, res) => {
    const charlieId = req.params.id;
    const sql = 'SELECT * FROM charliebrown WHERE charlieId = ?';
 
    connection.query( sql, [charlieId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('editCharlie', { charliebrown: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});
 
app.post('/editCharlie/:id', upload.single('image'), (req, res) => {
    const charlieId = req.params.id;
    const { charlieName, charliePrice } = req.body;
    let charlieImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        charlieImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE charliebrown SET charlieName = ? , charliePrice = ?, charlieImage = ? WHERE charlieId = ?';
 
    connection.query( sql, [charlieName, charliePrice, charlieImage, charlieId], (error, results) => {
        if (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Error updating product');
        } else {
            res.redirect('/charliebrown');
        }
    });
});

app.get('/deleteCharlie/:id', (req, res) => {
    const charlieId = req.params.id;
    const sql = 'DELETE FROM charliebrown WHERE charlieId = ?';
    connection.query( sql, [charlieId], (error, results) => {
        if (error) {
            console.error("Error deleting product:", error);
            res.status(500).send('Error deleting product');
        } else {
            res.redirect('/charliebrown');
        }
    })
})

// Snoopy -------------------------------------------
app.get('/snoopy', (req, res) => {
    let sql = 'SELECT * FROM snoopy';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving product:", error);
        res.status(500).send('Error retrieving product');
      } else {
        res.render('snoopy', { snoopy: results });
      }
    });
  });

app.get('/snoopy/:id', (req, res) => {
    const snoopyId = req.params.id;
    const sql = 'SELECT * FROM snoopy WHERE snoopyId = ?';
    connection.query(sql, [snoopyId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('snoopyDetail', { snoopy: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.get('/addSnoopy', (req, res) => {
    res.render('addSnoopy');
});

app.post('/addSnoopy', upload.single('snoopyImage'), (req, res) => {
    const { snoopyName, snoopyPrice } = req.body;
    let snoopyImage;
    if (req.file) {
        snoopyImage = req.file.filename;
    } else {
        snoopyImage = null;
    }
 
    const sql = 'INSERT INTO snoopy (snoopyName, snoopyPrice, snoopyImage) VALUES (?, ?, ?)';
    connection.query( sql, [ snoopyName, snoopyPrice, snoopyImage ], (error, results) => {
        if (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Error adding product');
        } else {
            res.redirect('/snoopy');
        }
    });
});

app.get('/editSnoopy/:id', (req, res) => {
    const snoopyId = req.params.id;
    const sql = 'SELECT * FROM snoopy WHERE snoopyId = ?';
 
    connection.query( sql, [snoopyId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('editSnoopy', { snoopy: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});
 
app.post('/editSnoopy/:id', upload.single('image'), (req, res) => {
    const snoopyId = req.params.id;
    const { snoopyName, snoopyPrice } = req.body;
    let snoopyImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        snoopyImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE snoopy SET snoopyName = ? , snoopyPrice = ?, snoopyImage = ? WHERE snoopyId = ?';
 
    connection.query( sql, [snoopyName, snoopyPrice, snoopyImage, snoopyId], (error, results) => {
        if (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Error updating product');
        } else {
            res.redirect('/snoopy');
        }
    });
});

app.get('/deleteSnoopy/:id', (req, res) => {
    const snoopyId = req.params.id;
    const sql = 'DELETE FROM snoopy WHERE snoopyId = ?';
    connection.query( sql, [snoopyId], (error, results) => {
        if (error) {
            console.error("Error deleting product:", error);
            res.status(500).send('Error deleting product');
        } else {
            res.redirect('/snoopy');
        }
    })
})

// Woodstock -------------------------------------------
app.get('/woodstock', (req, res) => {
    let sql = 'SELECT * FROM woodstock';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving product:", error);
        res.status(500).send('Error retrieving product');
      } else {
        res.render('woodstock', { woodstock: results });
      }
    });
  });

app.get('/woodstock/:id', (req, res) => {
    const woodstockId = req.params.id;
    const sql = 'SELECT * FROM woodstock WHERE woodstockId = ?';
    connection.query(sql, [woodstockId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('woodstockDetail', { woodstock: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.get('/addWoodstock', (req, res) => {
    res.render('addWoodstock');
});

app.post('/addWoodstock', upload.single('woodstockImage'), (req, res) => {
    const { woodstockName, woodstockPrice } = req.body;
    let woodstockImage;
    if (req.file) {
        woodstockImage = req.file.filename;
    } else {
        woodstockImage = null;
    }
 
    const sql = 'INSERT INTO woodstock (woodstockName, woodstockPrice, woodstockImage) VALUES (?, ?, ?)';
    connection.query( sql, [ woodstockName, woodstockPrice, woodstockImage ], (error, results) => {
        if (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Error adding product');
        } else {
            res.redirect('/woodstock');
        }
    });
});

app.get('/editWoodstock/:id', (req, res) => {
    const woodstockId = req.params.id;
    const sql = 'SELECT * FROM woodstock WHERE woodstockId = ?';
 
    connection.query( sql, [woodstockId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('editWoodstock', { woodstock: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});
 
app.post('/editWoodstock/:id', upload.single('image'), (req, res) => {
    const woodstockId = req.params.id;
    const { woodstockName, woodstockPrice } = req.body;
    let woodstockImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        woodstockImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE woodstock SET woodstockName = ? , woodstockPrice = ?, woodstockImage = ? WHERE woodstockId = ?';
 
    connection.query( sql, [woodstockName, woodstockPrice, woodstockImage, woodstockId], (error, results) => {
        if (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Error updating product');
        } else {
            res.redirect('/woodstock');
        }
    });
});

app.get('/deleteWoodstock/:id', (req, res) => {
    const woodstockId = req.params.id;
    const sql = 'DELETE FROM woodstock WHERE woodstockId = ?';
    connection.query( sql, [woodstockId], (error, results) => {
        if (error) {
            console.error("Error deleting product:", error);
            res.status(500).send('Error deleting product');
        } else {
            res.redirect('/woodstock');
        }
    })
})

// New Arrival -------------------------------------------
app.get('/newarrival', (req, res) => {
    let sql = 'SELECT * FROM newarrival';
    connection.query( sql, (error, results) => {
      if (error) {
        console.error("Error retrieving product:", error);
        res.status(500).send('Error retrieving product');
      } else {
        res.render('newarrival', { newarrival: results });
      }
    });
  });

app.get('/newarrival/:id', (req, res) => {
    const newarrivalId = req.params.id;
    const sql = 'SELECT * FROM newarrival WHERE newarrivalId = ?';
    connection.query(sql, [newarrivalId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('newarrivalDetail', { newarrival: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.get('/addNewarrival', (req, res) => {
    res.render('addNewarrival');
});

app.post('/addNewarrival', upload.single('newarrivalImage'), (req, res) => {
    const { newarrivalName, newarrivalPrice } = req.body;
    let newarrivalImage;
    if (req.file) {
        newarrivalImage = req.file.filename;
    } else {
        newarrivalImage = null;
    }
 
    const sql = 'INSERT INTO newarrival (newarrivalName, newarrivalPrice, newarrivalImage) VALUES (?, ?, ?)';
    connection.query( sql, [ newarrivalName, newarrivalPrice, newarrivalImage ], (error, results) => {
        if (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Error adding product');
        } else {
            res.redirect('/newarrival');
        }
    });
});

app.get('/editNewarrival/:id', (req, res) => {
    const newarrivalId = req.params.id;
    const sql = 'SELECT * FROM newarrival WHERE newarrivalId = ?';
 
    connection.query( sql, [newarrivalId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('editNewarrival', { newarrival: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});
 
app.post('/editNewarrival/:id', upload.single('image'), (req, res) => {
    const newarrivalId = req.params.id;
    const { newarrivalName, newarrivalPrice } = req.body;
    let newarrivalImage = req.body.currentImage; // Retrieve current image filename
    if (req.file) { // If new image is uploaded
        newarrivalImage = req.file.filename; // Set image to be new image file
    }
    
    const sql = 'UPDATE newarrival SET newarrivalName = ? , newarrivalPrice = ?, newarrivalImage = ? WHERE newarrivalId = ?';
 
    connection.query( sql, [newarrivalName, newarrivalPrice, newarrivalImage, newarrivalId], (error, results) => {
        if (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Error updating product');
        } else {
            res.redirect('/newarrival');
        }
    });
});

app.get('/deleteNewarrival/:id', (req, res) => {
    const newarrivalId = req.params.id;
    const sql = 'DELETE FROM newarrival WHERE newarrivalId = ?';
    connection.query( sql, [newarrivalId], (error, results) => {
        if (error) {
            console.error("Error deleting product:", error);
            res.status(500).send('Error deleting product');
        } else {
            res.redirect('/newarrival');
        }
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));