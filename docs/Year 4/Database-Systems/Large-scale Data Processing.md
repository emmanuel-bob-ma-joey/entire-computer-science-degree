---
sidebar_position: 9
---

To improve database performance and capacity, two options are available:

1. **Scale up**: buy larger machines
2. **Scale out**: more machines with parallel execution

## Performance metrics:

- **Throughput**: the number of transactions or queries that can be processed per unit of time

- **Response time**: the time taken for a transaction or query to be processed

**Node**: a single machine or server that is part of a larger database cluster. Each node stores a portion of the database's data and can process queries independently or in coordination with other nodes.

**Speedup** - the improvement in performance or execution time of a task achieved by using multiple nodes in comparison to performing the same task on a single node.

::::tip[Example]
If a task takes 100 seconds to complete on one processor and 25 seconds to complete using four processors, the speedup is:

$$
 \text{Speedup} = \frac{\text{Time with one processor}}{\text{Time with multiple processors}} = \frac{100}{25} = 4
$$

::::

More nodes means more machines with parallel execution, which means more throughput and possibly lower response time.

Speedup is non-linear due to various reaons such as overhead of communication between nodes, coordinating the execution of queries, and execution load not being perfectly equally distributed.

![Speedup](../../../images/Year%204/Database%20Systems/Large-Scale%20Data%20Processing/Speedup.png)

Instead of increasing the number of loads, we can also increase the capacity of existing nodes, enabling the handling of larger loads and more complex operations. This would have no effect on throughput, but allow queries with large data loads to be executed with the same response time.

## Parallel Query Evaluation

- **Inter-query parallelism**: Different queries run in parallel on different nodes
- **Intra-query parallelism**: A single query is broken down into multiple parts and each part is executed in parallel on different nodes

  - **Inter-operator parallelism**: Different operators in a query run on different nodes.
  - **Intra-operator parallelism**: A single operator is broken down into multiple parts and each part is executed in parallel on different nodes

## Horizontal Data Partitioning(Sharding)

The tuples in the table are partitioned into chunks according to some partition key, with each table partition is in a different node. The location of each tuple is stored in a key-value table. By allowing data to be distributed across nodes, it improves perfomance and scalability.

### Hash Partition

Data is partitioned using a hash function on some attribute X:

- Hash function is a function that takes in an X value and returns a hash value. e.g r.X mod(N) where N is the number of partitions
- Record r goes to chunk i if hash(r.X) mod N = i

### Range Partition

Data is partitioned into ranges on some attribute X:

- partition all possible values of attribute X into ranges. e.g X=[1, 2, 3, 4, 5] -> [1-2], [2-3], [3-4], [4-5]
- Record r goes to chunk i if r.X is in the range of chunk i

::::tip[Example parallel selection]
![Parallel selection](../../../images/Year%204/Database%20Systems/Large-Scale%20Data%20Processing/parallelSelection.png)

Execution path

1. Push selection to nodes that contain the relevant chunks of data
2. execute the selection locally at each node
3. send result to a coordinating node
4. Assemble result and return to user

Projection and Aggregation operators can also be done locally at each node, howevever in the case of aggregation, there will be different post-processing needed depending on the aggregation function - e.g min of mins
::::
::::tip[Example parallel join]
![Parallel join](../../../images/Year%204/Database%20Systems/Large-Scale%20Data%20Processing/paralleljoin1.png)

both relations R and S are partitioned into nodes. however since a join requires a cross product, each node will have to perform a cross product with all other nodes. Thus the join can be done as follows:

1. For each node that contains a chunk of the larger relation, copy the chunks of the smaller relation
2. Do the join within each node locally
3. Merge the results

![Parallel join](../../../images/Year%204/Database%20Systems/Large-Scale%20Data%20Processing/paralleljoin2.png)

::::

## Vertical Data Partitioning

Same idea, except the data is not partitioned by rows(tuples) but by columns, e.g a table with columns A, B, C, and D might be split into two partitions: one with columns A and B, and another with columns C and D.

This type of partitioning is useful for improving performance and managing large datasets by separating frequently accessed columns from those accessed less frequently.
