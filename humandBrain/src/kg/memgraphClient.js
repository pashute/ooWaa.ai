import neo4j from 'neo4j-driver';

export function createDriver(
  uri = process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
  user = process.env.MEMGRAPH_USER || 'memgraph',
  password = process.env.MEMGRAPH_PASSWORD || 'memgraph'
) {
  return neo4j.driver(uri, neo4j.auth.basic(user, password), {
    connectionTimeout: 3000,
  });
}

export async function testConnection(driver) {
  const session = driver.session();
  try {
    await session.run('RETURN 1');
    return true;
  } catch {
    return false;
  } finally {
    await session.close();
  }
}

/**
 * Execute an array of Cypher statements sequentially (node by node).
 */
export async function runStatements(driver, statements) {
  const session = driver.session();
  try {
    for (const stmt of statements) {
      await session.run(stmt);
    }
  } finally {
    await session.close();
  }
}

/**
 * Retrieve the full KG as a plain JSON-serialisable object:
 * { nodes: [{ labels, props }], relationships: [{ type, from, to }] }
 */
export async function getKgAsJson(driver) {
  const session = driver.session();
  try {
    const nodesResult = await session.run(
      'MATCH (n) RETURN labels(n) AS labels, properties(n) AS props'
    );
    const relsResult = await session.run(
      'MATCH (a)-[r]->(b) RETURN type(r) AS type, properties(a) AS from, properties(b) AS to'
    );

    return {
      nodes: nodesResult.records.map(r => ({
        labels: r.get('labels'),
        props: r.get('props'),
      })),
      relationships: relsResult.records.map(r => ({
        type: r.get('type'),
        from: r.get('from'),
        to: r.get('to'),
      })),
    };
  } finally {
    await session.close();
  }
}

/** Remove every node and relationship – use in test setup/teardown only. */
export async function clearKg(driver) {
  const session = driver.session();
  try {
    await session.run('MATCH (n) DETACH DELETE n');
  } finally {
    await session.close();
  }
}
