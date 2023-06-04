import React, { useState } from "react";
import { convertBase64 } from 'image-convert-base64';

const BaseTest = () => {

    const [b, setB] = useState<any>();

  return (
    <div style={{ padding: 100 }}>
      <form>
        <input type="file" onChange={ async (e: any) => {
            const base64 = await convertBase64(e.target.files[0]);
            console.log(base64)
            if(base64){
                setB(base64);
            }
          }} accept="image/*" />
      </form>
      <p>file: {b ?? 'null'}</p>
    </div>
  );
}

export default BaseTest;