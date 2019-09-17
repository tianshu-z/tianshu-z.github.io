
function find_related(idx, table) //idx is the index of professor 1
{
	var relation_array = [];
	for ( var i = 0; i < 11; i ++ ) 
	{
		if (i != idx) 
		{
			if (table[i].kFeature1 == table[idx].kFeature1 || table[i].kFeature1 == table[idx].kFeature2 || table[i].kFeature1 == table[idx].kFeature3 || table[i].kFeature1 == table[idx].kFeature4)
			{
				relation_array.push(i);
				relation_array.push(table[i].kFeature1);
				continue;
			}

			if (table[i].kFeature2 == table[idx].kFeature1 || table[i].kFeature1 == table[idx].kFeature2 || table[i].kFeature1 == table[idx].kFeature3 || table[i].kFeature1 == table[idx].kFeature4)
			{
				relation_array.push(i);
				relation_array.push(table[i].kFeature2);
				continue;
			}

			if (table[i].kFeature3 == table[idx].kFeature1 || table[i].kFeature1 == table[idx].kFeature2 || table[i].kFeature1 == table[idx].kFeature3 || table[i].kFeature1 == table[idx].kFeature4)
			{
				relation_array.push(i);
				relation_array.push(table[i].kFeature3);
				continue;
			}

			if (table[i].kFeature4 == table[idx].kFeature1 || table[i].kFeature1 == table[idx].kFeature2 || table[i].kFeature1 == table[idx].kFeature3 || table[i].kFeature1 == table[idx].kFeature4)
			{
				relation_array.push(i);
				relation_array.push(table[i].kFeature4);
				continue;
			}
		
		}
	}

	relation_array.push(idx);
	relation_array.push(table[idx].kFeature1);
	return relation_array;
}

