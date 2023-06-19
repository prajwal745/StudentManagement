import conn from "../../../helper/db";

export default async function handler(req, res) {
  console.log("req", req.method, req?.query?.params);

  if (req.method === "POST") {
    try {
      const query =
        "INSERT INTO course(course_name) VALUES($1)";
      const values = [...Object.values(req.body)];
      const result = await conn.query(query, values);

      res.status(200).json({ data: result?.rowCount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    // Process a POST request
  } else {
    try {
      const query = "select * from course";
      const result = await conn.query(query);
      res.status(200).json({ data: result?.rows });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
