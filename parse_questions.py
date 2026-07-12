import re
import json

with open('questions.txt', 'r') as f:
    lines = [line.strip() for line in f if line.strip()]

questions = []
current_topic = "Uncategorized"

i = 0
while i < len(lines):
    line = lines[i]
    
    # Check if this line is a topic header: e.g., "Arrays & Hashing (41 problems)"
    if re.search(r'\(\d+\s*problems\)', line, re.IGNORECASE):
        current_topic = re.sub(r'\(\d+\s*problems\)', '', line).strip()
        i += 1
        continue
    
    # Check if we hit the table header: "#", "Title", "Diff", "Link"
    if line == "#" and i+3 < len(lines) and lines[i+1] == "Title" and lines[i+2] == "Diff" and lines[i+3] == "Link":
        i += 4
        continue

    # A question row starts with a number (ID)
    if re.match(r'^\d+$', line):
        if i + 3 < len(lines):
            q_id = int(line)
            title = lines[i+1]
            diff = lines[i+2]
            link = lines[i+3]
            
            # Link might be split across lines
            j = i + 4
            while j < len(lines) and not re.match(r'^\d+$', lines[j]) and not re.search(r'\(\d+\s*problems\)', lines[j]) and lines[j] != "#":
                link += lines[j]
                j += 1
                
            if link.startswith("http"):
                questions.append({
                    "id": q_id,
                    "title": title,
                    "difficulty": diff,
                    "topic": current_topic,
                    "link": link.replace(' ', '') # remove spaces that might have occurred from split lines
                })
            i = j
            continue
    i += 1

with open('src/questions.json', 'w') as f:
    json.dump(questions, f, indent=2)

print(f"Parsed {len(questions)} valid questions.")
