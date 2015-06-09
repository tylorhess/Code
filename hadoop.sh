Hadoop
	master/slave architecture (relational, not non-relational)
		master
			NameNode (file system) - one
			JobTracker
		slave
			DataNode (file system) - multiple
			TaskTracker (MapReduce)
