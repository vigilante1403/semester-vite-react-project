import { Typography } from "@mui/material";
import { motion } from "framer-motion";
export default function ContactPage() {
    return (
        <>
        <motion.div
      whileTap={{ rotateY: 180 }} // Lật 180 độ khi nhấp vào
      style={{ width: 100, height: 100, backgroundColor: "blue" }}
    >
      Click me!
    </motion.div>
    <Typography>My contact page</Typography>
        </>
        
    )
}