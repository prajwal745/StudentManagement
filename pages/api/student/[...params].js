import conn from "../../../helper/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const [studentId] = req?.query?.params;
    try {
      const query = "DELETE FROM student WHERE student_id = $1";
      const values = [studentId];
      const result = await conn.query(query, values);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
