import PostureCamera from "./component/PostureCamera";

function App() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        Posture AI 🔥
      </h1>

      <PostureCamera />
    </div>
  );
}

export default App;