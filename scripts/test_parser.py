import urllib.request
import json
import re
import os
import time

def parse_example(text):
    # Find Input line
    m_input = re.search(r'Input:\s*(.*?)(?:\n|Output:|$)', text, re.IGNORECASE | re.DOTALL)
    m_output = re.search(r'Output:\s*(.*?)(?:\n|Explanation:|$)', text, re.IGNORECASE | re.DOTALL)
    
    inp_str = m_input.group(1).strip() if m_input else ''
    out_str = m_output.group(1).strip() if m_output else ''
    
    # Parse key-values from input
    parts = []
    current = []
    depth = 0
    in_quotes = False
    quote_char = ''
    for char in inp_str:
        if char in ('"', "'"):
            if not in_quotes:
                in_quotes = True
                quote_char = char
            elif char == quote_char:
                in_quotes = False
        if not in_quotes:
            if char in ('[', '{'):
                depth += 1
            elif char in (']', '}'):
                depth -= 1
        if char == ',' and depth == 0 and not in_quotes:
            parts.append(''.join(current).strip())
            current = []
        else:
            current.append(char)
    if current:
        parts.append(''.join(current).strip())
        
    inp_dict = {}
    for p in parts:
        if '=' in p:
            k, v = p.split('=', 1)
            k = k.strip()
            v = v.strip()
            # evaluate value as JSON safely
            try:
                # Replace single quotes with double quotes
                v_clean = v.replace("'", '"')
                val = json.loads(v_clean)
            except Exception:
                val = v
            inp_dict[k] = val
            
    try:
        out_val = json.loads(out_str.replace("'", '"'))
    except Exception:
        out_val = out_str
        
    return inp_dict, out_val

print("Parser test:")
print(parse_example("Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]"))
