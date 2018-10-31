Primary Key (PK) # unique identifier
	1. unique
	2. never changes
	3. never null

Foreign Key (FK) # is a Primary Key in another table
	1. can repeat (do not have to be unique)

Composite Primary Key (PK,FK|PK,FK) # uses two (or more) attributes (columns) to uniquely identify each record (row)
# probably better off creating a new id attribute to serve as the Primary Key
	1. use the fewest attributes possible
	2. do not use attributes that may change

Compound Key # Primary Key made from concatenating two Foreign Keys