import json
import glob

# Ensure all 11 sections are in the list
sections_order = ['csharp', 'dotnet', 'architecture', 'aspnet', 'efcore', 'sql', 'dbms', 'os', 'networking', 'systemdesign', 'devops']
current_new_id = 1
id_map = {}

# 1. Update all main questions
for section in sections_order:
    main_file = f"src/data/topics/{section}.json"
    try:
        with open(main_file, 'r') as f: data = json.load(f)
    except FileNotFoundError:
        continue

    for q in data:
        # We only map the old ID to new if it's NOT a new unmapped question
        # Actually, new questions all have id=900.
        # But we need a unique mapping. Let's just create followups dynamically later.
        q['id'] = current_new_id
        current_new_id += 1
    
    with open(main_file, 'w') as f: json.dump(data, f, indent=2)

# 2. Re-create followups from scratch for the new questions, and keep old ones
for section in sections_order:
    main_file = f"src/data/topics/{section}.json"
    followup_file = f"src/data/topics/{section}_followups.json"
    
    try:
        with open(main_file, 'r') as f: main_data = json.load(f)
    except FileNotFoundError:
        continue
        
    try:
        with open(followup_file, 'r') as f: old_followups = json.load(f)
        # old followups are useless now because IDs changed and we didn't track old_id properly for duplicates.
    except FileNotFoundError:
        old_followups = []
        
    # Wait, the easiest way to preserve old followups is to just generate blank ones ONLY for missing IDs.
    # Actually, we did have a mapping: id_map[old_id] = new_id. But since we added new questions with id=900, id_map[900] would be overwritten.
    pass

