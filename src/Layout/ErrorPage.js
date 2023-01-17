import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="">
      <div className="flex justify-center mt-[100px]">
        <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
      </div>
      <div className="text-center text-xl font-semibold hover:text-main-500">
        <Link to="/" className="text-center">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
