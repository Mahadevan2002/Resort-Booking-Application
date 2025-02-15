import { Card } from "../ui1/Card";
import { CardContent } from "../ui1/CardContent";
import { motion } from "framer-motion";
import { Smile } from "lucide-react";

export default function LogoutSuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600"
    >
      <Card className="p-6 bg-white shadow-2xl rounded-2xl text-center max-w-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="flex justify-center mb-4"
        >
          <Smile size={60} className="text-yellow-500" />
        </motion.div>
        <CardContent>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Logout Successfully!
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Thank you for visiting us, take care! 😊
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
