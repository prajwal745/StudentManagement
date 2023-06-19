import conn from "../../../helper/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const [resultId] = req?.query?.params;
    try {
      const query = "DELETE FROM results WHERE results_id = $1";
      const values = [resultId];
      const result = await conn.query(query, values);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
