import conn from "../../../helper/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const [courseId] = req?.query?.params;
    try {
      const query = "DELETE FROM course WHERE course_id = $1";
      const values = [courseId];
      const result = await conn.query(query, values);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
