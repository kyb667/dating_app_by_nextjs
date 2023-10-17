import neo4j, { Node, Relationship, Integer } from "neo4j-driver";

// interface PersonProperties {
//   tmdbId: string;
//   name: string;
//   born: number; // Year of birth
// }

// type Person = Node<Integer, PersonProperties>;

// type ActedIn = Relationship<
//   Integer,
//   {
//     roles: string[];
//   }
// >;

// interface PersonActedInMovie {
//   p: Person;
//   r: ActedIn;
//   // m: Movie;
// }

let driver: any;

export function getDriver() {
  if (!driver) {
    driver = neo4j.driver(
      process.env.NEXT_PUBLIC_DB_HOST,
      neo4j.auth.basic(
        process.env.NEXT_PUBLIC_DB_USER,
        process.env.NEXT_PUBLIC_DB_PASSWORD,
      ),
    );
  }
  return driver;
}

export const select = () => {
  const session = getDriver().session({ database: "neo4j" });
  return session
    .run(
      `
      MATCH (n)
      RETURN COUNT(n) AS count
      LIMIT 10
      `,
      //   { limit: "10" },
    )
    .then((result: any) => {
      result.records.forEach((record: any) => {
        console.log(record.get("count"));
        return record.get("count");
      });
      session.close();
      //   driver.close();
    })
    .catch((error: any) => {
      console.error(error);
      session.close();
    });
};

export const createPerson = () => {
  console.log("create person");
  const session = getDriver().session({ database: "neo4j" });
  const data = session
    .run(`MERGE (a:Person {name: 'adam!'}) ON CREATE set a.age = 27`)
    .then((result: any) => {
      console.log(result);
      session.close();
    })
    .catch((error: any) => {
      console.error(error);
      session.close();
    });
};

export const createPerson1 = () => {
  console.log("create person1");
  const session = getDriver().session({ database: "neo4j" });
  const personName = "Alice";
  const data = session
    .run("CREATE (a1:Person {name: $name}) RETURN a1", { name: personName })
    .then((result: any) => {
      console.log(result);
      session.close();
    })
    .catch((error: any) => {
      console.error(error);
      session.close();
    });
};
