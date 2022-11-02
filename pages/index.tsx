import type { NextPage } from "next";
import Head from "next/head";
import CanvasDraw from "react-canvas-draw";
import { useIsMobileOrTablet } from "./hooks/useIsMobileOrTablet";
import { useHotkeys } from "react-hotkeys-hook";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: NextPage = () => {
  const isMobOrTab = useIsMobileOrTablet();
  const canvasRef = useRef(null);
  const [brushSize, setSize] = useState(5);
  const [brushColor, setColor] = useState("white");

  const showToast: (msg: string) 
    => void = (msg) => {
      toast.info(msg);
  };

  useEffect(() => {
    showToast(`Brush Color set to ${brushColor}`);
  },[brushColor])

  useHotkeys("escape", () => {
    clear();
    showToast("Cleared canvas");
  });
  useHotkeys("delete", () => {
    clear();
    showToast("Cleared canvas");
  });

  useHotkeys("enter", () => {
    undo();
    showToast("Undid last action");
  });
  useHotkeys("backspace", () => undo());

  useHotkeys("[", () => {
    brushSize > 5 && (() => {
      setSize(brushSize - 5);
      showToast("Decreased brush size");
    })();
  });
  useHotkeys("]", () => {
    setSize(brushSize + 5);
    showToast("Increased brush size");
  });

  const clear: () => void = () => {
    canvasRef?.current.eraseAll();
  };

  const undo: () => void = () => {
    canvasRef?.current.undo();
  };

  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "black",
    "white",
  ];

  return (
    <div
      style={{
        backgroundColor: "black",
        margin: 0,
        padding: 0,
        border: 0,
        display: 'block',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Head>
        <title>Chalkboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div
          style={{
            display: "flex",
            zIndex: 10,
            position: "absolute",
          }}
        >
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setColor(color)}
              style={{
                backgroundColor: color,
                width: 50,
                height: 50,
                borderBlockColor: (color === "white") ? "black" : "white",
                borderBlockWidth: 5,
                margin: 4,
              }}
            />
          ))}
        </div>
        <CanvasDraw
          ref={canvasRef}
          style={{
            padding: 0,
            margin: 0,
            width: '100%',
            height: '100%',
            background: "black",
            color: "white",
          }}
          brushRadius={brushSize}
          hideGrid={true}
          enablePanAndZoom={isMobOrTab}
          brushColor={brushColor}
        />
      </>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default Home;
