const path=require('path'),
      fs=require('fs',)
      convert = require('joi-to-json-schema'),
      convertArgs = require('commander'),
      exec = require('child_process').exec;

     convertArgs.version('0.1.0')
     .option('-d,--dir <dir>')
     .option('-o,--output <output>')
     .parse(process.argv);

    var normalizedPath = path.join(__dirname, convertArgs.dir);

    fs.readdir(normalizedPath,function(err,files) {       
        if(err){
            console.log(err);
        }
        files.forEach(function(file){
            let fileArray=file.split('.');
            if (fileArray[1] ==='js' && fileArray[2] === undefined ){
                console.log(normalizedPath+'\\' + file);
                   let joiFile = require(normalizedPath+'\\' + file);
                   let js = convert(joiFile);
                   fs.writeFile(normalizedPath+'\\'+file+".schema.json",JSON.stringify(js),function(err){
                        if(err){
                            return console.log(err);
                        }
                    });
            }       
        })
        let command ='jsonschema2md -d '+convertArgs.dir+' -o '+convertArgs.dir
        exec(command)
    });
    