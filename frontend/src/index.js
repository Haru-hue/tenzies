import React from "react"
import { createRoot } from "react-dom/client"
import Tenzie from "./Tenzie"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<Tenzie/>)