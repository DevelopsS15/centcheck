"use client";
import Webcam from "react-webcam";
// import { BarcodeScanner } from "react-barcode-scanner";
// import "react-barcode-scanner/polyfill";

export default function NavBarcodeScanner() {
  return (
    <Webcam
      videoConstraints={{
        facingMode: "environment",
      }}
    />
  );
  //   return <BarcodeScanner />;
}
