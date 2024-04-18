---
sidebar_position: 6
---

An index is a data structure that improves the speed of data retrieval operations on a database at the cost of additional writes and storage space. They are used to quickly locate data without having to search every row in a database table.

### B+ Trees

The B+ tree is a balanced tree, where the internal nodes direct the search and leaf nodes contain the data entries. Each leaf node represents one memory page, with leaf nodes being doubly linked for easy data traversal.
