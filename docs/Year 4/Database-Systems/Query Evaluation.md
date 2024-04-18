---
sidebar_position: 7
---

The processing of an SQL query is delegated to 3 programs:

- **Parser**: translates the SQL query into an internal query representation based on relational algebra
- **Query Optimizer**: determines the most efficient way to execute the query, i.e. determines an efficient execution plan
- **Plan Executor**: executes the plan and returns the result to the user

Queries are composed of a few **basic operators**:

- **Selection**: filters the tuples based on a condition
- **Projection**: selects specific attributes from the tuples
- **Order By**: orders the tuples based on a specific attribute
- **Join**: combines the tuples of two queries based on a common attribute
- **Group By**: groups the tuples based on a specific attribute and applies an aggregate function to each group
- **Intersection**: returns the tuples that are present in both queries
- **etc...**

## Cost model and notation

There are multiple ways of implementing each relational operator, thus we must estimate how expensive a specific execution is to be able to choose the most efficient. As a general back of napkin calcuation, we will compare performance based on number of I/O i.e pages retrieved from disk. We make a few simplifying assumptions:

- the root and intermediate nodes of the B+ tree are in main memory
- leaf nodes and data pages are not in memory

## Schema for our example

```SQL

Users (uid: int, uname: string, experience: int, age: int)
```

```SQL
GroupMembers (uid: int, gid: int, stars: int)
```

<table>

<tr>
<td>

Users(U):

- 40,000 tuples, denoted as |U|
- around 80 tuples per page
- 500 data pages/block
- index on UID has 170 leaf pages
- index on uname has around 300 leaf pages

</td>
<td>
GroupMembers(GM):

- 100,000 tuples (denoted as |GM|)
- Around 100 tuples per data page/block
- Total of 1000 data pages (denoted as GroupMemberPages)
</td>
</tr>
</table>

## Selection

```SQL
SELECT  *
FROM    Users
WHERE   uid = 123
```

### Reduction factor

The **reduction factor** of a condition is the ratio of the number of tuples in the result to the number of tuples in the original table. It is used to determine the efficiency of the query; the higher the reduction factor, the more efficient the query is. Given a relation $R$, it can be expressed as

$$
\text{Red}(\sigma_{\text{condition}}(R)) = \frac{|\sigma_{\text{condition}}(R)|}{|R|}
$$

<mark>Example</mark>

Assume there are 10 different experience levels for User, and we want to calculate the reduction factor for the condition when the user has experience of 5. it can be calculated as:

$$
\text{Red}(\sigma_{\text{experience}=5}(U)) = \frac{1}{|\text{all experience levels}|} = 0.1
$$

When calculating execution efficiency, the value of $|\sigma_{\text{condition}}(R)|$ is not known, so a common solution is for the DBMS to keep track of the number of different values and assume a uniform distribution. This is done through various methods e.g indices, heuristics, histograms, etc.

Execution Options:

1. Simple scan on data pages

- always possible, even with indices
- I/O cost = # of data pages
- if search on primary key, average I/O cost = 1/2 # of data pages

2. Use an index on the condition attribute

- Case 1. clustered index tree
- Case 2. non-clustered index tree

### Clustered Index tree

### Non-clustered Index tree
