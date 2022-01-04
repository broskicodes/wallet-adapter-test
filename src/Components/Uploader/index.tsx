import React, { FC, useState, useEffect } from 'react';
import Arweave from "arweave";
import arKP from "../../keypairs/arKeypair.json";
import fileToArrayBuffer from "file-to-array-buffer";

const arweave = Arweave.init({});

export const Uploader: FC = () => {
  const [content, setContent] = useState<File | undefined>(undefined);

  const setFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if(files){
      const file = files[0];
      console.log("success");
      setContent(file);
      return;
    }

    console.log("No files chosen");
  }

  const uploadToArweave = async () => {
    if(!content) {
      console.log("No content to upload");
      return null;
    }

    let address = await arweave.wallets.jwkToAddress(arKP);
    console.log(address);

    arweave.wallets.getBalance(address).then((bal) => {
      console.log(arweave.ar.winstonToAr(bal));
    });

    try {
      const data = await fileToArrayBuffer(content as Blob);

      let tx1 = await arweave.createTransaction({
        data: data
      }, arKP);
      tx1.addTag("Content-Type", content.type);
      
      await arweave.transactions.sign(tx1, arKP);

      let uploader = await arweave.transactions.getUploader(tx1);

      while(!uploader.isComplete){
        await uploader.uploadChunk();
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
      }

      console.log(tx1);

      arweave.transactions.getStatus(tx1.id).then(res => {
        console.log(res);
      });
      
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div>
      <label htmlFor="content">File: </label>
      <input id="content" type="file" onChange={setFile} />

      <button onClick={uploadToArweave}>Upload</button>
    </div>
  )
}