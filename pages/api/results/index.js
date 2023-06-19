import conn from "../../../helper/db";

export default async function handler(req, res) {
  console.log("req", req.method, req?.query?.params);

  if (req.method === "POST") {
    try {
      const query =
        "INSERT INTO results(student_id, course_id, score) VALUES($1, $2, $3);";
      const values = [...Object.values(req.body)];
      const result = await conn.query(query, values);

      res.status(200).json({ data: result?.rowCount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const query = `select CONCAT (t2.first_name,' ', t2.family_name) as student_name , t3.course_name, t1.score, t1.results_id
      from results t1
      inner join student t2 on t1.student_id = t2.student_id
      inner join course t3 on t1.course_id = t3.course_id;`;
      const result = await conn.query(query);
      res.status(200).json({ data: result?.rows });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
