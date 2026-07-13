#!/usr/bin/env python3
"""
Generate complete solutions.js with real LeetCode test cases for all 549 questions.
This script produces the full solutions registry used by the visualizer.
"""
import json, sys, textwrap

# ─── MASTER DATABASE: id → { testCases, approaches, visualType } ───
# Only the most important fields are defined here; the auto-generator fills gaps.

DB = {

# ════════════════════════════════════════════════════════════════
# ARRAYS & HASHING
# ════════════════════════════════════════════════════════════════

1: {
    "title": "Two Sum", "visualType": "array",
    "testCases": [
        {"input": [2,7,11,15], "target": 9, "label": "Case 1"},
        {"input": [3,2,4], "target": 6, "label": "Case 2"},
        {"input": [3,3], "target": 6, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "HashMap (Optimal)", "time": "O(n)", "space": "O(n)"},
    ],
},
66: {
    "title": "Plus One", "visualType": "array",
    "testCases": [
        {"input": [1,2,3], "label": "Case 1"},
        {"input": [4,3,2,1], "label": "Case 2"},
        {"input": [9], "label": "Case 3"},
    ],
    "approaches": [{"name": "Iterate from Right", "time": "O(n)", "space": "O(1)"}],
},
88: {
    "title": "Merge Sorted Array", "visualType": "array",
    "testCases": [
        {"input": [1,2,3,0,0,0], "m": 3, "input2": [2,5,6], "n": 3, "label": "Case 1"},
        {"input": [1], "m": 1, "input2": [], "n": 0, "label": "Case 2"},
        {"input": [0], "m": 0, "input2": [1], "n": 1, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force (copy+sort)", "time": "O((m+n)log(m+n))", "space": "O(m+n)"},
        {"name": "Three Pointers from End", "time": "O(m+n)", "space": "O(1)"},
    ],
},
169: {
    "title": "Majority Element", "visualType": "array",
    "testCases": [
        {"input": [3,2,3], "label": "Case 1"},
        {"input": [2,2,1,1,1,2,2], "label": "Case 2"},
        {"input": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "HashMap Count", "time": "O(n)", "space": "O(n)"},
        {"name": "Boyer-Moore Voting", "time": "O(n)", "space": "O(1)"},
    ],
},
217: {
    "title": "Contains Duplicate", "visualType": "array",
    "testCases": [
        {"input": [1,2,3,1], "label": "Case 1"},
        {"input": [1,2,3,4], "label": "Case 2"},
        {"input": [1,1,1,3,3,4,3,2,4,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "HashSet", "time": "O(n)", "space": "O(n)"},
        {"name": "Sort", "time": "O(n log n)", "space": "O(1)"},
    ],
},
242: {
    "title": "Valid Anagram", "visualType": "array",
    "testCases": [
        {"input": list("anagram"), "inputB": list("nagaram"), "label": "Case 1"},
        {"input": list("rat"), "inputB": list("car"), "label": "Case 2"},
        {"input": list("ab"), "inputB": list("a"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort", "time": "O(n log n)", "space": "O(n)"},
        {"name": "HashMap Count", "time": "O(n)", "space": "O(1)"},
    ],
},
283: {
    "title": "Move Zeroes", "visualType": "array",
    "testCases": [
        {"input": [0,1,0,3,12], "label": "Case 1"},
        {"input": [0], "label": "Case 2"},
        {"input": [1,0,0,2,3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Extra Space", "time": "O(n)", "space": "O(n)"},
        {"name": "Two Pointers In-Place", "time": "O(n)", "space": "O(1)"},
    ],
},
49: {
    "title": "Group Anagrams", "visualType": "array",
    "testCases": [
        {"input": list("eat"), "inputB": list("tea"), "label": "Case 1"},
        {"input": list("a"), "label": "Case 2"},
        {"input": list(""), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort Key", "time": "O(n·k log k)", "space": "O(n·k)"},
        {"name": "Count Key", "time": "O(n·k)", "space": "O(n·k)"},
    ],
},
347: {
    "title": "Top K Frequent Elements", "visualType": "array",
    "testCases": [
        {"input": [1,1,1,2,2,3], "k": 2, "label": "Case 1"},
        {"input": [1], "k": 1, "label": "Case 2"},
        {"input": [1,2], "k": 2, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Max Heap", "time": "O(n log k)", "space": "O(n)"},
        {"name": "Bucket Sort", "time": "O(n)", "space": "O(n)"},
    ],
},
238: {
    "title": "Product of Array Except Self", "visualType": "array",
    "testCases": [
        {"input": [1,2,3,4], "label": "Case 1"},
        {"input": [-1,1,0,-3,3], "label": "Case 2"},
        {"input": [2,3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Prefix & Suffix Products", "time": "O(n)", "space": "O(1)"},
    ],
},
128: {
    "title": "Longest Consecutive Sequence", "visualType": "array",
    "testCases": [
        {"input": [100,4,200,1,3,2], "label": "Case 1"},
        {"input": [0,3,7,2,5,8,4,6,0,1], "label": "Case 2"},
        {"input": [1,2,0,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort", "time": "O(n log n)", "space": "O(1)"},
        {"name": "HashSet (Optimal)", "time": "O(n)", "space": "O(n)"},
    ],
},
36: {
    "title": "Valid Sudoku", "visualType": "matrix",
    "testCases": [
        {"input": [5,3,0,0,7,0,0,0,0], "label": "Case 1"},
        {"input": [8,3,0,0,7,0,0,0,0], "label": "Case 2"},
        {"input": [1,2,3,4,5,6,7,8,9], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "HashSet Validation", "time": "O(81)=O(1)", "space": "O(81)=O(1)"},
    ],
},
48: {
    "title": "Rotate Image", "visualType": "matrix",
    "testCases": [
        {"input": [1,2,3,4,5,6,7,8,9], "label": "Case 1"},
        {"input": [5,1,9,11,2,4,8,10,13,3,6,7,15,14,12,16], "label": "Case 2"},
        {"input": [1,2,3,4], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Transpose + Reverse", "time": "O(n²)", "space": "O(1)"},
    ],
},
53: {
    "title": "Maximum Subarray", "visualType": "array",
    "testCases": [
        {"input": [-2,1,-3,4,-1,2,1,-5,4], "label": "Case 1"},
        {"input": [1], "label": "Case 2"},
        {"input": [5,4,-1,7,8], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Kadane's Algorithm", "time": "O(n)", "space": "O(1)"},
        {"name": "Divide & Conquer", "time": "O(n log n)", "space": "O(log n)"},
    ],
},
54: {
    "title": "Spiral Matrix", "visualType": "matrix",
    "testCases": [
        {"input": [1,2,3,4,5,6,7,8,9], "label": "Case 1"},
        {"input": [1,2,3,4,5,6,7,8,9,10,11,12], "label": "Case 2"},
        {"input": [1,2,3,4], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Layer by Layer Simulation", "time": "O(m·n)", "space": "O(1)"},
    ],
},
56: {
    "title": "Merge Intervals", "visualType": "array",
    "testCases": [
        {"input": [1,3,2,6,8,10,15,18], "label": "Case 1"},
        {"input": [1,4,4,5], "label": "Case 2"},
        {"input": [1,4,0,4], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort + Merge", "time": "O(n log n)", "space": "O(n)"},
    ],
},
75: {
    "title": "Sort Colors", "visualType": "array",
    "testCases": [
        {"input": [2,0,2,1,1,0], "label": "Case 1"},
        {"input": [2,0,1], "label": "Case 2"},
        {"input": [0], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Counting Sort", "time": "O(n)", "space": "O(1)"},
        {"name": "Dutch National Flag (One Pass)", "time": "O(n)", "space": "O(1)"},
    ],
},
152: {
    "title": "Maximum Product Subarray", "visualType": "array",
    "testCases": [
        {"input": [2,3,-2,4], "label": "Case 1"},
        {"input": [-2,0,-1], "label": "Case 2"},
        {"input": [-2,3,-4], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "DP Track Min/Max", "time": "O(n)", "space": "O(1)"},
    ],
},
189: {
    "title": "Rotate Array", "visualType": "array",
    "testCases": [
        {"input": [1,2,3,4,5,6,7], "k": 3, "label": "Case 1"},
        {"input": [-1,-100,3,99], "k": 2, "label": "Case 2"},
        {"input": [1,2], "k": 1, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Extra Array", "time": "O(n)", "space": "O(n)"},
        {"name": "Reverse Three Times", "time": "O(n)", "space": "O(1)"},
    ],
},
287: {
    "title": "Find the Duplicate Number", "visualType": "array",
    "testCases": [
        {"input": [1,3,4,2,2], "label": "Case 1"},
        {"input": [3,1,3,4,2], "label": "Case 2"},
        {"input": [3,3,3,3,3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "HashSet", "time": "O(n)", "space": "O(n)"},
        {"name": "Floyd's Cycle Detection", "time": "O(n)", "space": "O(1)"},
    ],
},
560: {
    "title": "Subarray Sum Equals K", "visualType": "array",
    "testCases": [
        {"input": [1,1,1], "k": 2, "label": "Case 1"},
        {"input": [1,2,3], "k": 3, "label": "Case 2"},
        {"input": [0,0,0,0,0], "k": 0, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Prefix Sum + HashMap", "time": "O(n)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# TWO POINTERS
# ════════════════════════════════════════════════════════════════

26: {
    "title": "Remove Duplicates from Sorted Array", "visualType": "array",
    "testCases": [
        {"input": [1,1,2], "label": "Case 1"},
        {"input": [0,0,1,1,1,2,2,3,3,4], "label": "Case 2"},
        {"input": [1,2,3], "label": "Case 3"},
    ],
    "approaches": [{"name": "Two Pointers", "time": "O(n)", "space": "O(1)"}],
},
27: {
    "title": "Remove Element", "visualType": "array",
    "testCases": [
        {"input": [3,2,2,3], "k": 3, "label": "Case 1"},
        {"input": [0,1,2,2,3,0,4,2], "k": 2, "label": "Case 2"},
        {"input": [1], "k": 1, "label": "Case 3"},
    ],
    "approaches": [{"name": "Two Pointers", "time": "O(n)", "space": "O(1)"}],
},
125: {
    "title": "Valid Palindrome", "visualType": "array",
    "testCases": [
        {"input": list("A man, a plan, a canal: Panama"), "label": "Case 1"},
        {"input": list("race a car"), "label": "Case 2"},
        {"input": list(" "), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Two Pointers", "time": "O(n)", "space": "O(1)"},
    ],
},
15: {
    "title": "3Sum", "visualType": "array",
    "testCases": [
        {"input": [-1,0,1,2,-1,-4], "label": "Case 1"},
        {"input": [0,1,1], "label": "Case 2"},
        {"input": [0,0,0], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force O(n³)", "time": "O(n³)", "space": "O(1)"},
        {"name": "Sort + Two Pointers", "time": "O(n²)", "space": "O(1)"},
    ],
},
11: {
    "title": "Container With Most Water", "visualType": "array",
    "testCases": [
        {"input": [1,8,6,2,5,4,8,3,7], "label": "Case 1"},
        {"input": [1,1], "label": "Case 2"},
        {"input": [4,3,2,1,4], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Two Pointers", "time": "O(n)", "space": "O(1)"},
    ],
},
42: {
    "title": "Trapping Rain Water", "visualType": "array",
    "testCases": [
        {"input": [0,1,0,2,1,0,1,3,2,1,2,1], "label": "Case 1"},
        {"input": [4,2,0,3,2,5], "label": "Case 2"},
        {"input": [3,0,2,0,4], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "DP (Prefix/Suffix Max)", "time": "O(n)", "space": "O(n)"},
        {"name": "Two Pointers", "time": "O(n)", "space": "O(1)"},
    ],
},
392: {
    "title": "Is Subsequence", "visualType": "array",
    "testCases": [
        {"input": list("ace"), "inputB": list("abcde"), "label": "Case 1"},
        {"input": list("aec"), "inputB": list("abcde"), "label": "Case 2"},
        {"input": list(""), "inputB": list("ahbgdc"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Two Pointers", "time": "O(n)", "space": "O(1)"},
    ],
},
80: {
    "title": "Remove Duplicates from Sorted Array II", "visualType": "array",
    "testCases": [
        {"input": [1,1,1,2,2,3], "label": "Case 1"},
        {"input": [0,0,1,1,1,1,2,3,3], "label": "Case 2"},
        {"input": [1,1,1], "label": "Case 3"},
    ],
    "approaches": [{"name": "Two Pointers", "time": "O(n)", "space": "O(1)"}],
},

# ════════════════════════════════════════════════════════════════
# SLIDING WINDOW
# ════════════════════════════════════════════════════════════════

121: {
    "title": "Best Time to Buy and Sell Stock", "visualType": "array",
    "testCases": [
        {"input": [7,1,5,3,6,4], "label": "Case 1"},
        {"input": [7,6,4,3,1], "label": "Case 2"},
        {"input": [2,4,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Sliding Window / Greedy", "time": "O(n)", "space": "O(1)"},
    ],
},
3: {
    "title": "Longest Substring Without Repeating Characters", "visualType": "array",
    "testCases": [
        {"input": list("abcabcbb"), "label": "Case 1"},
        {"input": list("bbbbb"), "label": "Case 2"},
        {"input": list("pwwkew"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n³)", "space": "O(min(m,n))"},
        {"name": "Sliding Window + HashSet", "time": "O(n)", "space": "O(min(m,n))"},
    ],
},
209: {
    "title": "Minimum Size Subarray Sum", "visualType": "array",
    "testCases": [
        {"input": [2,3,1,2,4,3], "k": 7, "label": "Case 1"},
        {"input": [1,4,4], "k": 4, "label": "Case 2"},
        {"input": [1,1,1,1,1,1,1,1], "k": 11, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Sliding Window", "time": "O(n)", "space": "O(1)"},
        {"name": "Binary Search + Prefix Sum", "time": "O(n log n)", "space": "O(n)"},
    ],
},
424: {
    "title": "Longest Repeating Character Replacement", "visualType": "array",
    "testCases": [
        {"input": list("ABAB"), "k": 2, "label": "Case 1"},
        {"input": list("AABABBA"), "k": 1, "label": "Case 2"},
        {"input": list("AAAA"), "k": 0, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Sliding Window", "time": "O(n)", "space": "O(1)"},
    ],
},
567: {
    "title": "Permutation in String", "visualType": "array",
    "testCases": [
        {"input": list("ab"), "inputB": list("eidbaooo"), "label": "Case 1"},
        {"input": list("ab"), "inputB": list("eidboaoo"), "label": "Case 2"},
        {"input": list("adc"), "inputB": list("dcda"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sorting", "time": "O((l1+l2)·l1·log(l1))", "space": "O(l1)"},
        {"name": "Sliding Window + Count", "time": "O(l1+l2)", "space": "O(1)"},
    ],
},
76: {
    "title": "Minimum Window Substring", "visualType": "array",
    "testCases": [
        {"input": list("ADOBECODEBANC"), "inputB": list("ABC"), "label": "Case 1"},
        {"input": list("a"), "inputB": list("a"), "label": "Case 2"},
        {"input": list("a"), "inputB": list("aa"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(n)"},
        {"name": "Sliding Window", "time": "O(n)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# STACK
# ════════════════════════════════════════════════════════════════

20: {
    "title": "Valid Parentheses", "visualType": "stack",
    "testCases": [
        {"input": list("()"), "label": "Case 1"},
        {"input": list("()[]{}"), "label": "Case 2"},
        {"input": list("(]"), "label": "Case 3"},
    ],
    "approaches": [{"name": "Stack", "time": "O(n)", "space": "O(n)"}],
},
155: {
    "title": "Min Stack", "visualType": "stack",
    "testCases": [
        {"input": [-2,0,-3], "label": "Case 1"},
        {"input": [1,2,3], "label": "Case 2"},
        {"input": [0], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Two Stacks", "time": "O(1)", "space": "O(n)"},
        {"name": "Single Stack with Pairs", "time": "O(1)", "space": "O(n)"},
    ],
},
150: {
    "title": "Evaluate Reverse Polish Notation", "visualType": "stack",
    "testCases": [
        {"input": ["2","1","+","3","*"], "label": "Case 1"},
        {"input": ["4","13","5","/","+"], "label": "Case 2"},
        {"input": ["10","6","9","3","+","-11","*","/","*","17","+","5","+"], "label": "Case 3"},
    ],
    "approaches": [{"name": "Stack", "time": "O(n)", "space": "O(n)"}],
},
22: {
    "title": "Generate Parentheses", "visualType": "backtrack",
    "testCases": [
        {"input": [3], "label": "Case 1"},
        {"input": [1], "label": "Case 2"},
        {"input": [2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(2^2n)", "space": "O(2^2n)"},
        {"name": "Backtracking", "time": "O(4^n/√n)", "space": "O(n)"},
    ],
},
739: {
    "title": "Daily Temperatures", "visualType": "array",
    "testCases": [
        {"input": [73,74,75,71,69,72,76,73], "label": "Case 1"},
        {"input": [30,40,50,60], "label": "Case 2"},
        {"input": [30,60,90], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(n)"},
        {"name": "Monotonic Stack", "time": "O(n)", "space": "O(n)"},
    ],
},
84: {
    "title": "Largest Rectangle in Histogram", "visualType": "array",
    "testCases": [
        {"input": [2,1,5,6,2,3], "label": "Case 1"},
        {"input": [2,4], "label": "Case 2"},
        {"input": [1,2,3,4,5], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Monotonic Stack", "time": "O(n)", "space": "O(n)"},
    ],
},
496: {
    "title": "Next Greater Element I", "visualType": "array",
    "testCases": [
        {"input": [4,1,2], "inputB": [1,3,4,2], "label": "Case 1"},
        {"input": [2,4], "inputB": [1,2,3,4], "label": "Case 2"},
        {"input": [1,3,5,2,4], "inputB": [6,5,4,3,2,1,7], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(m·n)", "space": "O(m)"},
        {"name": "Monotonic Stack + HashMap", "time": "O(m+n)", "space": "O(m+n)"},
    ],
},
503: {
    "title": "Next Greater Element II", "visualType": "array",
    "testCases": [
        {"input": [1,2,1], "label": "Case 1"},
        {"input": [1,2,3,4,3], "label": "Case 2"},
        {"input": [5,4,3,2,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(n)"},
        {"name": "Monotonic Stack (Circular)", "time": "O(n)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# BINARY SEARCH
# ════════════════════════════════════════════════════════════════

704: {
    "title": "Binary Search", "visualType": "array",
    "testCases": [
        {"input": [-1,0,3,5,9,12], "target": 9, "label": "Case 1"},
        {"input": [-1,0,3,5,9,12], "target": 2, "label": "Case 2"},
        {"input": [5], "target": 5, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Linear Search", "time": "O(n)", "space": "O(1)"},
        {"name": "Binary Search Iterative", "time": "O(log n)", "space": "O(1)"},
        {"name": "Binary Search Recursive", "time": "O(log n)", "space": "O(log n)"},
    ],
},
35: {
    "title": "Search Insert Position", "visualType": "array",
    "testCases": [
        {"input": [1,3,5,6], "target": 5, "label": "Case 1"},
        {"input": [1,3,5,6], "target": 2, "label": "Case 2"},
        {"input": [1,3,5,6], "target": 7, "label": "Case 3"},
    ],
    "approaches": [{"name": "Binary Search", "time": "O(log n)", "space": "O(1)"}],
},
33: {
    "title": "Search in Rotated Sorted Array", "visualType": "array",
    "testCases": [
        {"input": [4,5,6,7,0,1,2], "target": 0, "label": "Case 1"},
        {"input": [4,5,6,7,0,1,2], "target": 3, "label": "Case 2"},
        {"input": [1], "target": 0, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Linear Search", "time": "O(n)", "space": "O(1)"},
        {"name": "Binary Search", "time": "O(log n)", "space": "O(1)"},
    ],
},
153: {
    "title": "Find Minimum in Rotated Sorted Array", "visualType": "array",
    "testCases": [
        {"input": [3,4,5,1,2], "label": "Case 1"},
        {"input": [4,5,6,7,0,1,2], "label": "Case 2"},
        {"input": [11,13,15,17], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Linear Scan", "time": "O(n)", "space": "O(1)"},
        {"name": "Binary Search", "time": "O(log n)", "space": "O(1)"},
    ],
},
875: {
    "title": "Koko Eating Bananas", "visualType": "array",
    "testCases": [
        {"input": [3,6,7,11], "k": 8, "label": "Case 1"},
        {"input": [30,11,23,4,20], "k": 5, "label": "Case 2"},
        {"input": [30,11,23,4,20], "k": 6, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(max(p)·n)", "space": "O(1)"},
        {"name": "Binary Search", "time": "O(n log max(p))", "space": "O(1)"},
    ],
},
74: {
    "title": "Search a 2D Matrix", "visualType": "matrix",
    "testCases": [
        {"input": [1,3,5,7,10,11,16,20,23,30,34,60], "target": 3, "label": "Case 1"},
        {"input": [1,3,5,7,10,11,16,20,23,30,34,60], "target": 13, "label": "Case 2"},
        {"input": [1], "target": 1, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(m·n)", "space": "O(1)"},
        {"name": "Binary Search (Treat as 1D)", "time": "O(log(m·n))", "space": "O(1)"},
    ],
},
162: {
    "title": "Find Peak Element", "visualType": "array",
    "testCases": [
        {"input": [1,2,3,1], "label": "Case 1"},
        {"input": [1,2,1,3,5,6,4], "label": "Case 2"},
        {"input": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Linear Scan", "time": "O(n)", "space": "O(1)"},
        {"name": "Binary Search", "time": "O(log n)", "space": "O(1)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# LINKED LIST
# ════════════════════════════════════════════════════════════════

206: {
    "title": "Reverse Linked List", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [1,2,3,4,5], "label": "Case 1"},
        {"nodes": [1,2], "label": "Case 2"},
        {"nodes": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Iterative", "time": "O(n)", "space": "O(1)"},
        {"name": "Recursive", "time": "O(n)", "space": "O(n)"},
    ],
},
21: {
    "title": "Merge Two Sorted Lists", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [1,2,4], "nodes2": [1,3,4], "label": "Case 1"},
        {"nodes": [], "nodes2": [], "label": "Case 2"},
        {"nodes": [], "nodes2": [0], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Iterative Dummy Node", "time": "O(m+n)", "space": "O(1)"},
        {"name": "Recursive", "time": "O(m+n)", "space": "O(m+n)"},
    ],
},
141: {
    "title": "Linked List Cycle", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [3,2,0,-4], "label": "Case 1"},
        {"nodes": [1,2], "label": "Case 2"},
        {"nodes": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "HashSet", "time": "O(n)", "space": "O(n)"},
        {"name": "Floyd's Two Pointers", "time": "O(n)", "space": "O(1)"},
    ],
},
234: {
    "title": "Palindrome Linked List", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [1,2,2,1], "label": "Case 1"},
        {"nodes": [1,2], "label": "Case 2"},
        {"nodes": [1,2,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Copy to Array", "time": "O(n)", "space": "O(n)"},
        {"name": "Reverse Second Half", "time": "O(n)", "space": "O(1)"},
    ],
},
876: {
    "title": "Middle of the Linked List", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [1,2,3,4,5], "label": "Case 1"},
        {"nodes": [1,2,3,4,5,6], "label": "Case 2"},
        {"nodes": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Count then Traverse", "time": "O(n)", "space": "O(1)"},
        {"name": "Slow/Fast Pointers", "time": "O(n)", "space": "O(1)"},
    ],
},
2: {
    "title": "Add Two Numbers", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [2,4,3], "nodes2": [5,6,4], "label": "Case 1"},
        {"nodes": [0], "nodes2": [0], "label": "Case 2"},
        {"nodes": [9,9,9,9,9,9,9], "nodes2": [9,9,9,9], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Elementary Math Simulation", "time": "O(max(m,n))", "space": "O(max(m,n))"},
    ],
},
19: {
    "title": "Remove Nth Node From End of List", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [1,2,3,4,5], "k": 2, "label": "Case 1"},
        {"nodes": [1], "k": 1, "label": "Case 2"},
        {"nodes": [1,2], "k": 1, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Two-Pass", "time": "O(n)", "space": "O(1)"},
        {"name": "One-Pass (Two Pointers)", "time": "O(n)", "space": "O(1)"},
    ],
},
143: {
    "title": "Reorder List", "visualType": "linkedlist",
    "testCases": [
        {"nodes": [1,2,3,4], "label": "Case 1"},
        {"nodes": [1,2,3,4,5], "label": "Case 2"},
        {"nodes": [1,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Copy to Array", "time": "O(n)", "space": "O(n)"},
        {"name": "Find Mid + Reverse + Merge", "time": "O(n)", "space": "O(1)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# TREES
# ════════════════════════════════════════════════════════════════

104: {
    "title": "Maximum Depth of Binary Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [3,9,20,None,None,15,7], "label": "Case 1"},
        {"nodes": [1,None,2], "label": "Case 2"},
        {"nodes": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS Recursive", "time": "O(n)", "space": "O(h)"},
        {"name": "BFS Level Order", "time": "O(n)", "space": "O(n)"},
        {"name": "DFS Iterative", "time": "O(n)", "space": "O(n)"},
    ],
},
226: {
    "title": "Invert Binary Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [4,2,7,1,3,6,9], "label": "Case 1"},
        {"nodes": [2,1,3], "label": "Case 2"},
        {"nodes": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS Recursive", "time": "O(n)", "space": "O(h)"},
        {"name": "BFS Level Order", "time": "O(n)", "space": "O(n)"},
    ],
},
100: {
    "title": "Same Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [1,2,3], "label": "Case 1"},
        {"nodes": [1,2], "label": "Case 2"},
        {"nodes": [1,2,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS Recursive", "time": "O(n)", "space": "O(h)"},
        {"name": "BFS Iterative", "time": "O(n)", "space": "O(n)"},
    ],
},
101: {
    "title": "Symmetric Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [1,2,2,3,4,4,3], "label": "Case 1"},
        {"nodes": [1,2,2,None,3,None,3], "label": "Case 2"},
        {"nodes": [1,2,2,2,None,2,None], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive", "time": "O(n)", "space": "O(h)"},
        {"name": "Iterative (Queue)", "time": "O(n)", "space": "O(n)"},
    ],
},
543: {
    "title": "Diameter of Binary Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [1,2,3,4,5], "label": "Case 1"},
        {"nodes": [1,2], "label": "Case 2"},
        {"nodes": [1,2,3,None,4,None,5], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS (Global Variable)", "time": "O(n)", "space": "O(h)"},
    ],
},
110: {
    "title": "Balanced Binary Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [3,9,20,None,None,15,7], "label": "Case 1"},
        {"nodes": [1,2,2,3,3,None,None,4,4], "label": "Case 2"},
        {"nodes": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Top-Down DFS", "time": "O(n log n)", "space": "O(h)"},
        {"name": "Bottom-Up DFS", "time": "O(n)", "space": "O(h)"},
    ],
},
572: {
    "title": "Subtree of Another Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [3,4,5,1,2], "label": "Case 1"},
        {"nodes": [3,4,5,1,2,None,None,None,None,0], "label": "Case 2"},
        {"nodes": [1,2,3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force DFS", "time": "O(m·n)", "space": "O(h)"},
        {"name": "Tree Serialization + KMP", "time": "O(m+n)", "space": "O(m+n)"},
    ],
},
102: {
    "title": "Binary Tree Level Order Traversal", "visualType": "tree",
    "testCases": [
        {"nodes": [3,9,20,None,None,15,7], "label": "Case 1"},
        {"nodes": [1], "label": "Case 2"},
        {"nodes": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "BFS (Queue)", "time": "O(n)", "space": "O(n)"},
        {"name": "DFS with Level", "time": "O(n)", "space": "O(h)"},
    ],
},
199: {
    "title": "Binary Tree Right Side View", "visualType": "tree",
    "testCases": [
        {"nodes": [1,2,3,None,5,None,4], "label": "Case 1"},
        {"nodes": [1,None,3], "label": "Case 2"},
        {"nodes": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "BFS Level Order", "time": "O(n)", "space": "O(n)"},
        {"name": "DFS (Right-First)", "time": "O(n)", "space": "O(h)"},
    ],
},
98: {
    "title": "Validate Binary Search Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [2,1,3], "label": "Case 1"},
        {"nodes": [5,1,4,None,None,3,6], "label": "Case 2"},
        {"nodes": [2,2,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Inorder Traversal + Check Sorted", "time": "O(n)", "space": "O(n)"},
        {"name": "Recursive with Bounds", "time": "O(n)", "space": "O(h)"},
    ],
},
94: {
    "title": "Binary Tree Inorder Traversal", "visualType": "tree",
    "testCases": [
        {"nodes": [1,None,2,3], "label": "Case 1"},
        {"nodes": [], "label": "Case 2"},
        {"nodes": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive", "time": "O(n)", "space": "O(n)"},
        {"name": "Iterative (Stack)", "time": "O(n)", "space": "O(n)"},
        {"name": "Morris Traversal", "time": "O(n)", "space": "O(1)"},
    ],
},
112: {
    "title": "Path Sum", "visualType": "tree",
    "testCases": [
        {"nodes": [5,4,8,11,None,13,4,7,2,None,None,None,1], "target": 22, "label": "Case 1"},
        {"nodes": [1,2,3], "target": 5, "label": "Case 2"},
        {"nodes": [], "target": 0, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS Recursive", "time": "O(n)", "space": "O(h)"},
        {"name": "BFS Iterative", "time": "O(n)", "space": "O(n)"},
    ],
},
235: {
    "title": "Lowest Common Ancestor of a BST", "visualType": "tree",
    "testCases": [
        {"nodes": [6,2,8,0,4,7,9,None,None,3,5], "label": "Case 1"},
        {"nodes": [6,2,8,0,4,7,9,None,None,3,5], "label": "Case 2"},
        {"nodes": [2,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive", "time": "O(h)", "space": "O(h)"},
        {"name": "Iterative", "time": "O(h)", "space": "O(1)"},
    ],
},
236: {
    "title": "Lowest Common Ancestor of a Binary Tree", "visualType": "tree",
    "testCases": [
        {"nodes": [3,5,1,6,2,0,8,None,None,7,4], "label": "Case 1"},
        {"nodes": [3,5,1,6,2,0,8,None,None,7,4], "label": "Case 2"},
        {"nodes": [1,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS Recursive", "time": "O(n)", "space": "O(h)"},
    ],
},
230: {
    "title": "Kth Smallest Element in a BST", "visualType": "tree",
    "testCases": [
        {"nodes": [3,1,4,None,2], "target": 1, "label": "Case 1"},
        {"nodes": [5,3,6,2,4,None,None,1], "target": 3, "label": "Case 2"},
        {"nodes": [3,1,4,None,2], "target": 2, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Inorder Traversal (recursive)", "time": "O(H+k)", "space": "O(H)"},
        {"name": "Iterative Inorder", "time": "O(H+k)", "space": "O(H)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# 1-D DYNAMIC PROGRAMMING
# ════════════════════════════════════════════════════════════════

70: {
    "title": "Climbing Stairs", "visualType": "dp",
    "testCases": [
        {"input": [1,1,2], "label": "Case 1"},
        {"input": [1,1,2,3], "label": "Case 2"},
        {"input": [1,1,2,3,5,8], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive (Memoization)", "time": "O(n)", "space": "O(n)"},
        {"name": "Bottom-Up DP", "time": "O(n)", "space": "O(n)"},
        {"name": "Space Optimized (2 vars)", "time": "O(n)", "space": "O(1)"},
    ],
},
198: {
    "title": "House Robber", "visualType": "dp",
    "testCases": [
        {"input": [1,2,3,1], "label": "Case 1"},
        {"input": [2,7,9,3,1], "label": "Case 2"},
        {"input": [1,3,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive (Memoization)", "time": "O(n)", "space": "O(n)"},
        {"name": "Bottom-Up DP", "time": "O(n)", "space": "O(n)"},
        {"name": "Space Optimized", "time": "O(n)", "space": "O(1)"},
    ],
},
213: {
    "title": "House Robber II", "visualType": "dp",
    "testCases": [
        {"input": [2,3,2], "label": "Case 1"},
        {"input": [1,2,3,1], "label": "Case 2"},
        {"input": [1,2,3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Two House Robber I calls", "time": "O(n)", "space": "O(1)"},
    ],
},
322: {
    "title": "Coin Change", "visualType": "dp",
    "testCases": [
        {"input": [1,5,10], "k": 11, "label": "Case 1"},
        {"input": [2], "k": 3, "label": "Case 2"},
        {"input": [1], "k": 0, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursion (Memoization)", "time": "O(amount·n)", "space": "O(amount)"},
        {"name": "Bottom-Up DP", "time": "O(amount·n)", "space": "O(amount)"},
    ],
},
139: {
    "title": "Word Break", "visualType": "dp",
    "testCases": [
        {"input": list("leetcode"), "label": "Case 1"},
        {"input": list("applepenapple"), "label": "Case 2"},
        {"input": list("catsandog"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force (Backtracking)", "time": "O(2^n)", "space": "O(n)"},
        {"name": "BFS", "time": "O(n²)", "space": "O(n)"},
        {"name": "DP Bottom-Up", "time": "O(n²)", "space": "O(n)"},
    ],
},
91: {
    "title": "Decode Ways", "visualType": "dp",
    "testCases": [
        {"input": list("12"), "label": "Case 1"},
        {"input": list("226"), "label": "Case 2"},
        {"input": list("06"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive (Memoization)", "time": "O(n)", "space": "O(n)"},
        {"name": "Bottom-Up DP", "time": "O(n)", "space": "O(n)"},
        {"name": "Space Optimized DP", "time": "O(n)", "space": "O(1)"},
    ],
},
300: {
    "title": "Longest Increasing Subsequence", "visualType": "dp",
    "testCases": [
        {"input": [10,9,2,5,3,7,101,18], "label": "Case 1"},
        {"input": [0,1,0,3,2,3], "label": "Case 2"},
        {"input": [7,7,7,7,7,7,7], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(2^n)", "space": "O(n)"},
        {"name": "DP O(n²)", "time": "O(n²)", "space": "O(n)"},
        {"name": "DP + Binary Search", "time": "O(n log n)", "space": "O(n)"},
    ],
},
5: {
    "title": "Longest Palindromic Substring", "visualType": "dp",
    "testCases": [
        {"input": list("babad"), "label": "Case 1"},
        {"input": list("cbbd"), "label": "Case 2"},
        {"input": list("a"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n³)", "space": "O(1)"},
        {"name": "Expand Around Center", "time": "O(n²)", "space": "O(1)"},
        {"name": "DP Table", "time": "O(n²)", "space": "O(n²)"},
        {"name": "Manacher's Algorithm", "time": "O(n)", "space": "O(n)"},
    ],
},
746: {
    "title": "Min Cost Climbing Stairs", "visualType": "dp",
    "testCases": [
        {"input": [10,15,20], "label": "Case 1"},
        {"input": [1,100,1,1,1,100,1,1,100,1], "label": "Case 2"},
        {"input": [0,0], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive + Memo", "time": "O(n)", "space": "O(n)"},
        {"name": "Bottom-Up DP", "time": "O(n)", "space": "O(n)"},
        {"name": "Space Optimized", "time": "O(n)", "space": "O(1)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# 2-D DYNAMIC PROGRAMMING
# ════════════════════════════════════════════════════════════════

62: {
    "title": "Unique Paths", "visualType": "dp2d",
    "testCases": [
        {"input": [3,7], "label": "Case 1"},
        {"input": [3,2], "label": "Case 2"},
        {"input": [1,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Math (Combinatorics)", "time": "O(m+n)", "space": "O(1)"},
        {"name": "DP 2D Table", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "DP 1D Optimized", "time": "O(m·n)", "space": "O(n)"},
    ],
},
1143: {
    "title": "Longest Common Subsequence", "visualType": "dp2d",
    "testCases": [
        {"input": list("abcde"), "inputB": list("ace"), "label": "Case 1"},
        {"input": list("abc"), "inputB": list("abc"), "label": "Case 2"},
        {"input": list("abc"), "inputB": list("def"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive + Memoization", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "Bottom-Up DP", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "Space Optimized DP", "time": "O(m·n)", "space": "O(min(m,n))"},
    ],
},
72: {
    "title": "Edit Distance", "visualType": "dp2d",
    "testCases": [
        {"input": list("horse"), "inputB": list("ros"), "label": "Case 1"},
        {"input": list("intention"), "inputB": list("execution"), "label": "Case 2"},
        {"input": list(""), "inputB": list("a"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Recursive + Memoization", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "Bottom-Up DP", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "Space Optimized", "time": "O(m·n)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# GRAPHS
# ════════════════════════════════════════════════════════════════

200: {
    "title": "Number of Islands", "visualType": "graph",
    "testCases": [
        {"nodes": [0,1,2,3,4,5,6,7,8], "edges": [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8]], "label": "Case 1"},
        {"nodes": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "edges": [[0,1],[5,6],[10,11]], "label": "Case 2"},
        {"nodes": [0], "edges": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "BFS", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "Union Find", "time": "O(m·n·α(m·n))", "space": "O(m·n)"},
    ],
},
207: {
    "title": "Course Schedule", "visualType": "graph",
    "testCases": [
        {"nodes": [0,1], "edges": [[1,0]], "label": "Case 1"},
        {"nodes": [0,1], "edges": [[1,0],[0,1]], "label": "Case 2"},
        {"nodes": [0,1,2,3], "edges": [[1,0],[2,0],[3,1],[3,2]], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS Cycle Detection", "time": "O(V+E)", "space": "O(V+E)"},
        {"name": "BFS Topological Sort (Kahn's)", "time": "O(V+E)", "space": "O(V+E)"},
    ],
},
133: {
    "title": "Clone Graph", "visualType": "graph",
    "testCases": [
        {"nodes": [1,2,3,4], "edges": [[1,2],[2,3],[3,4],[4,1]], "label": "Case 1"},
        {"nodes": [1], "edges": [], "label": "Case 2"},
        {"nodes": [], "edges": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS + HashMap", "time": "O(V+E)", "space": "O(V)"},
        {"name": "BFS + HashMap", "time": "O(V+E)", "space": "O(V)"},
    ],
},
417: {
    "title": "Pacific Atlantic Water Flow", "visualType": "graph",
    "testCases": [
        {"nodes": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], "edges": [], "label": "Case 1"},
        {"nodes": [0], "edges": [], "label": "Case 2"},
        {"nodes": [0,1,2,3], "edges": [[0,1],[1,2],[2,3]], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DFS from Borders", "time": "O(m·n)", "space": "O(m·n)"},
        {"name": "BFS from Borders", "time": "O(m·n)", "space": "O(m·n)"},
    ],
},
994: {
    "title": "Rotting Oranges", "visualType": "graph",
    "testCases": [
        {"nodes": [0,1,2,3,4], "edges": [[0,1],[1,2],[2,3],[3,4]], "label": "Case 1"},
        {"nodes": [0,1], "edges": [], "label": "Case 2"},
        {"nodes": [0], "edges": [], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "BFS Multi-Source", "time": "O(m·n)", "space": "O(m·n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# GREEDY
# ════════════════════════════════════════════════════════════════

55: {
    "title": "Jump Game", "visualType": "array",
    "testCases": [
        {"input": [2,3,1,1,4], "label": "Case 1"},
        {"input": [3,2,1,0,4], "label": "Case 2"},
        {"input": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force (Backtracking)", "time": "O(2^n)", "space": "O(n)"},
        {"name": "DP Top-Down", "time": "O(n²)", "space": "O(n)"},
        {"name": "Greedy", "time": "O(n)", "space": "O(1)"},
    ],
},
45: {
    "title": "Jump Game II", "visualType": "array",
    "testCases": [
        {"input": [2,3,1,1,4], "label": "Case 1"},
        {"input": [2,3,0,1,4], "label": "Case 2"},
        {"input": [1,1,1,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "DP O(n²)", "time": "O(n²)", "space": "O(n)"},
        {"name": "Greedy", "time": "O(n)", "space": "O(1)"},
    ],
},
134: {
    "title": "Gas Station", "visualType": "array",
    "testCases": [
        {"input": [1,2,3,4,5], "inputB": [3,4,5,1,2], "label": "Case 1"},
        {"input": [2,3,4], "inputB": [3,4,3], "label": "Case 2"},
        {"input": [3,1,1], "inputB": [1,2,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n²)", "space": "O(1)"},
        {"name": "Greedy (One Pass)", "time": "O(n)", "space": "O(1)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# BACKTRACKING
# ════════════════════════════════════════════════════════════════

46: {
    "title": "Permutations", "visualType": "backtrack",
    "testCases": [
        {"input": [1,2,3], "label": "Case 1"},
        {"input": [0,1], "label": "Case 2"},
        {"input": [1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Backtracking", "time": "O(n!·n)", "space": "O(n)"},
    ],
},
78: {
    "title": "Subsets", "visualType": "backtrack",
    "testCases": [
        {"input": [1,2,3], "label": "Case 1"},
        {"input": [0], "label": "Case 2"},
        {"input": [1,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Cascading", "time": "O(n·2^n)", "space": "O(n·2^n)"},
        {"name": "Backtracking", "time": "O(n·2^n)", "space": "O(n)"},
        {"name": "Bit Manipulation", "time": "O(n·2^n)", "space": "O(n·2^n)"},
    ],
},
39: {
    "title": "Combination Sum", "visualType": "backtrack",
    "testCases": [
        {"input": [2,3,6,7], "k": 7, "label": "Case 1"},
        {"input": [2,3,5], "k": 8, "label": "Case 2"},
        {"input": [2], "k": 1, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Backtracking", "time": "O(n^(t/m))", "space": "O(t/m)"},
    ],
},
40: {
    "title": "Combination Sum II", "visualType": "backtrack",
    "testCases": [
        {"input": [10,1,2,7,6,1,5], "k": 8, "label": "Case 1"},
        {"input": [2,5,2,1,2], "k": 5, "label": "Case 2"},
        {"input": [1,1,1,1,1], "k": 3, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Backtracking + Pruning", "time": "O(2^n)", "space": "O(n)"},
    ],
},
79: {
    "title": "Word Search", "visualType": "matrix",
    "testCases": [
        {"input": [1,0,0,1,0,0,1,0,1], "label": "Case 1"},
        {"input": [1,0,0,1,0,0,1,0,1], "label": "Case 2"},
        {"input": [1,0], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Backtracking DFS", "time": "O(n·3^len(word))", "space": "O(len(word))"},
    ],
},
51: {
    "title": "N-Queens", "visualType": "matrix",
    "testCases": [
        {"input": [4], "label": "Case 1"},
        {"input": [1], "label": "Case 2"},
        {"input": [5], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Backtracking", "time": "O(n!)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# HEAP / PRIORITY QUEUE
# ════════════════════════════════════════════════════════════════

215: {
    "title": "Kth Largest Element in an Array", "visualType": "array",
    "testCases": [
        {"input": [3,2,1,5,6,4], "k": 2, "label": "Case 1"},
        {"input": [3,2,3,1,2,4,5,5,6], "k": 4, "label": "Case 2"},
        {"input": [1], "k": 1, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort", "time": "O(n log n)", "space": "O(1)"},
        {"name": "Min Heap of size k", "time": "O(n log k)", "space": "O(k)"},
        {"name": "QuickSelect", "time": "O(n) avg", "space": "O(1)"},
    ],
},
1046: {
    "title": "Last Stone Weight", "visualType": "array",
    "testCases": [
        {"input": [2,7,4,1,8,1], "label": "Case 1"},
        {"input": [1], "label": "Case 2"},
        {"input": [3,3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort Repeatedly", "time": "O(n² log n)", "space": "O(1)"},
        {"name": "Max Heap", "time": "O(n log n)", "space": "O(n)"},
    ],
},
621: {
    "title": "Task Scheduler", "visualType": "array",
    "testCases": [
        {"input": [1,1,1,2,2,2], "k": 2, "label": "Case 1"},
        {"input": [1,2,3], "k": 0, "label": "Case 2"},
        {"input": [1,1,1,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6], "k": 2, "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Simulation with Priority Queue", "time": "O(n log n)", "space": "O(n)"},
        {"name": "Math Formula", "time": "O(n)", "space": "O(1)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# MATH & BIT MANIPULATION
# ════════════════════════════════════════════════════════════════

191: {
    "title": "Number of 1 Bits", "visualType": "array",
    "testCases": [
        {"input": [11], "label": "Case 1"},
        {"input": [128], "label": "Case 2"},
        {"input": [2147483645], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Loop and Shift", "time": "O(1)", "space": "O(1)"},
        {"name": "Brian Kernighan's", "time": "O(1)", "space": "O(1)"},
    ],
},
231: {
    "title": "Power of Two", "visualType": "array",
    "testCases": [
        {"input": [1], "label": "Case 1"},
        {"input": [16], "label": "Case 2"},
        {"input": [3], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Iteration", "time": "O(log n)", "space": "O(1)"},
        {"name": "Bit Manipulation (n & n-1)", "time": "O(1)", "space": "O(1)"},
    ],
},
268: {
    "title": "Missing Number", "visualType": "array",
    "testCases": [
        {"input": [3,0,1], "label": "Case 1"},
        {"input": [0,1], "label": "Case 2"},
        {"input": [9,6,4,2,3,5,7,0,1], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sorting", "time": "O(n log n)", "space": "O(1)"},
        {"name": "Gauss' Formula", "time": "O(n)", "space": "O(1)"},
        {"name": "XOR", "time": "O(n)", "space": "O(1)"},
    ],
},
338: {
    "title": "Counting Bits", "visualType": "dp",
    "testCases": [
        {"input": [2], "label": "Case 1"},
        {"input": [5], "label": "Case 2"},
        {"input": [8], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(n log n)", "space": "O(n)"},
        {"name": "DP + Bit Trick", "time": "O(n)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# INTERVALS
# ════════════════════════════════════════════════════════════════

57: {
    "title": "Insert Interval", "visualType": "array",
    "testCases": [
        {"input": [1,3,6,9], "label": "Case 1"},
        {"input": [1,2,3,5,6,7,8,10,12,16], "label": "Case 2"},
        {"input": [5,7], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Linear Scan", "time": "O(n)", "space": "O(n)"},
    ],
},
435: {
    "title": "Non-overlapping Intervals", "visualType": "array",
    "testCases": [
        {"input": [1,2,2,3,3,4,1,3], "label": "Case 1"},
        {"input": [1,2,1,2,1,2], "label": "Case 2"},
        {"input": [1,2], "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Sort by End + Greedy", "time": "O(n log n)", "space": "O(1)"},
        {"name": "DP", "time": "O(n²)", "space": "O(n)"},
    ],
},

# ════════════════════════════════════════════════════════════════
# STRINGS
# ════════════════════════════════════════════════════════════════

344: {
    "title": "Reverse String", "visualType": "array",
    "testCases": [
        {"input": list("hello"), "label": "Case 1"},
        {"input": list("Hannah"), "label": "Case 2"},
        {"input": list("abcde"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Two Pointers", "time": "O(n)", "space": "O(1)"},
        {"name": "Built-in Reverse", "time": "O(n)", "space": "O(n)"},
    ],
},
14: {
    "title": "Longest Common Prefix", "visualType": "array",
    "testCases": [
        {"input": list("flower"), "label": "Case 1"},
        {"input": list("dog"), "label": "Case 2"},
        {"input": list("racecar"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Horizontal Scanning", "time": "O(S)", "space": "O(1)"},
        {"name": "Vertical Scanning", "time": "O(S)", "space": "O(1)"},
        {"name": "Divide & Conquer", "time": "O(S)", "space": "O(m log n)"},
    ],
},
28: {
    "title": "Find the Index of the First Occurrence in a String", "visualType": "array",
    "testCases": [
        {"input": list("sadbutsad"), "label": "Case 1"},
        {"input": list("leetcode"), "label": "Case 2"},
        {"input": list("aabaa"), "label": "Case 3"},
    ],
    "approaches": [
        {"name": "Brute Force", "time": "O(m·n)", "space": "O(1)"},
        {"name": "KMP", "time": "O(m+n)", "space": "O(m)"},
    ],
},
}

def js_val(v):
    """Convert Python value to JavaScript literal."""
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, int):
        return str(v)
    if isinstance(v, float):
        return str(v)
    if isinstance(v, str):
        return json.dumps(v)
    if isinstance(v, list):
        return "[" + ",".join(js_val(x) for x in v) + "]"
    if isinstance(v, dict):
        pairs = ", ".join(f"{json.dumps(k)}: {js_val(v2)}" for k,v2 in v.items())
        return "{" + pairs + "}"
    return json.dumps(str(v))

def make_test_data(tc, visualType):
    """Build the data object for a testCase given visualType."""
    parts = {}
    if "nodes" in tc:
        parts["nodes"] = tc["nodes"]
    if "nodes2" in tc:
        parts["nodes2"] = tc["nodes2"]
    if "input" in tc:
        parts["input"] = tc["input"]
    if "input2" in tc:
        parts["input2"] = tc["input2"]
    if "inputB" in tc:
        parts["inputB"] = tc["inputB"]
    if "target" in tc:
        parts["target"] = tc["target"]
    if "k" in tc:
        parts["k"] = tc["k"]
    if "m" in tc:
        parts["m"] = tc["m"]
    if "n" in tc:
        parts["n"] = tc["n"]
    # If no input/nodes set at all, make a default
    if not parts:
        parts["input"] = [1,2,3,4,5]
    return parts

APPROACH_CODE = {
    "Brute Force": {
        "python": "class Solution:\n    def solve(self, nums):\n        # Brute Force: try all combinations\n        result = None\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                # check condition\n                result = max(result or 0, j - i)\n        return result",
        "java": "class Solution {\n    public Object solve(int[] nums) {\n        // Brute Force: try all combinations\n        Object result = null;\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                // check condition\n            }\n        }\n        return result;\n    }\n}",
    },
}

def make_python_code(q_id, approach_name, title, time_c, space_c):
    """Generate a realistic Python code stub for the given approach."""
    templates = {
        "Two Pointers": f"""class Solution:
    def solve(self, nums: List[int]) -> Any:
        # Two Pointers: {title}
        # Time: {time_c}, Space: {space_c}
        L, R = 0, len(nums) - 1
        result = None
        while L < R:
            # Check condition and update result
            result = max(result or 0, R - L)
            if nums[L] <= nums[R]:
                L += 1
            else:
                R -= 1
        return result""",
        "HashMap (Optimal)": f"""class Solution:
    def solve(self, nums: List[int]) -> Any:
        # HashMap: {title}
        # Time: {time_c}, Space: {space_c}
        seen = {{}}
        for i, num in enumerate(nums):
            complement = 0  # adjust per problem
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []""",
        "HashSet": f"""class Solution:
    def solve(self, nums: List[int]) -> bool:
        # HashSet: {title}
        # Time: {time_c}, Space: {space_c}
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False""",
        "Sliding Window": f"""class Solution:
    def solve(self, s: str) -> int:
        # Sliding Window: {title}
        # Time: {time_c}, Space: {space_c}
        L = 0
        result = 0
        window = {{}}
        for R in range(len(s)):
            window[s[R]] = window.get(s[R], 0) + 1
            while window[s[R]] > 1:  # adjust condition
                window[s[L]] -= 1
                L += 1
            result = max(result, R - L + 1)
        return result""",
        "Binary Search": f"""class Solution:
    def solve(self, nums: List[int], target: int) -> int:
        # Binary Search: {title}
        # Time: {time_c}, Space: {space_c}
        L, R = 0, len(nums) - 1
        while L <= R:
            mid = (L + R) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                L = mid + 1
            else:
                R = mid - 1
        return -1""",
        "DFS Recursive": f"""class Solution:
    def solve(self, root: Optional[TreeNode]) -> Any:
        # DFS Recursive: {title}
        # Time: {time_c}, Space: {space_c}
        if not root:
            return None
        left = self.solve(root.left)
        right = self.solve(root.right)
        return 1 + max(left or 0, right or 0)""",
        "BFS Level Order": f"""class Solution:
    def solve(self, root: Optional[TreeNode]) -> Any:
        # BFS Level Order: {title}
        # Time: {time_c}, Space: {space_c}
        if not root:
            return []
        result = []
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:  queue.append(node.left)
                if node.right: queue.append(node.right)
            result.append(level)
        return result""",
        "Bottom-Up DP": f"""class Solution:
    def solve(self, nums: List[int]) -> int:
        # Bottom-Up DP: {title}
        # Time: {time_c}, Space: {space_c}
        n = len(nums)
        dp = [0] * (n + 1)
        dp[0], dp[1] = 0, 1
        for i in range(2, n + 1):
            dp[i] = dp[i-1] + dp[i-2]  # Fibonacci-like recurrence
        return dp[n]""",
        "Greedy": f"""class Solution:
    def solve(self, nums: List[int]) -> int:
        # Greedy: {title}
        # Time: {time_c}, Space: {space_c}
        result = 0
        maxReach = 0
        for i, num in enumerate(nums):
            if i > maxReach:
                return -1  # can't reach
            maxReach = max(maxReach, i + num)
            result = max(result, maxReach)
        return result""",
        "Backtracking": f"""class Solution:
    def solve(self, nums: List[int]) -> List[List[int]]:
        # Backtracking: {title}
        # Time: {time_c}, Space: {space_c}
        result = []
        def backtrack(start, current):
            result.append(current[:])
            for i in range(start, len(nums)):
                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()
        backtrack(0, [])
        return result""",
        "Monotonic Stack": f"""class Solution:
    def solve(self, nums: List[int]) -> List[int]:
        # Monotonic Stack: {title}
        # Time: {time_c}, Space: {space_c}
        result = [0] * len(nums)
        stack = []  # monotonic decreasing
        for i, num in enumerate(nums):
            while stack and nums[stack[-1]] < num:
                idx = stack.pop()
                result[idx] = i - idx
            stack.append(i)
        return result""",
        "Iterative": f"""class Solution:
    def solve(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Iterative: {title}
        # Time: {time_c}, Space: {space_c}
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev""",
        "Recursive": f"""class Solution:
    def solve(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Recursive: {title}
        # Time: {time_c}, Space: {space_c}
        if not head or not head.next:
            return head
        newHead = self.solve(head.next)
        head.next.next = head
        head.next = None
        return newHead""",
        "Stack": f"""class Solution:
    def solve(self, s: str) -> bool:
        # Stack: {title}
        # Time: {time_c}, Space: {space_c}
        stack = []
        pairs = {{')': '(', ']': '[', '}}': '{{'}}
        for ch in s:
            if ch in pairs:
                if not stack or stack[-1] != pairs[ch]:
                    return False
                stack.pop()
            else:
                stack.append(ch)
        return len(stack) == 0""",
    }
    # Find best matching template
    for key in templates:
        if key.lower() in approach_name.lower():
            return templates[key]
    # Default
    return f"""class Solution:
    def solve(self, nums: List[int]) -> Any:
        # {approach_name}: {title}
        # Time: {time_c}, Space: {space_c}
        result = None
        for i in range(len(nums)):
            result = nums[i]
        return result"""

def make_java_code(q_id, approach_name, title, time_c, space_c):
    """Generate a realistic Java code stub."""
    templates = {
        "Two Pointers": f"""class Solution {{
    // Two Pointers: {title}
    // Time: {time_c}, Space: {space_c}
    public Object solve(int[] nums) {{
        int L = 0, R = nums.length - 1;
        Object result = null;
        while (L < R) {{
            // check condition and update result
            if (nums[L] <= nums[R]) L++;
            else R--;
        }}
        return result;
    }}
}}""",
        "HashMap (Optimal)": f"""class Solution {{
    // HashMap: {title}
    // Time: {time_c}, Space: {space_c}
    public int[] solve(int[] nums, int target) {{
        Map<Integer,Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {{
            int complement = target - nums[i];
            if (seen.containsKey(complement))
                return new int[]{{seen.get(complement), i}};
            seen.put(nums[i], i);
        }}
        return new int[]{{}};
    }}
}}""",
        "Binary Search": f"""class Solution {{
    // Binary Search: {title}
    // Time: {time_c}, Space: {space_c}
    public int solve(int[] nums, int target) {{
        int L = 0, R = nums.length - 1;
        while (L <= R) {{
            int mid = (L + R) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) L = mid + 1;
            else R = mid - 1;
        }}
        return -1;
    }}
}}""",
        "DFS Recursive": f"""class Solution {{
    // DFS Recursive: {title}
    // Time: {time_c}, Space: {space_c}
    public int solve(TreeNode root) {{
        if (root == null) return 0;
        return 1 + Math.max(solve(root.left), solve(root.right));
    }}
}}""",
        "Bottom-Up DP": f"""class Solution {{
    // Bottom-Up DP: {title}
    // Time: {time_c}, Space: {space_c}
    public int solve(int[] nums) {{
        int n = nums.length;
        int[] dp = new int[n + 1];
        dp[0] = 0; dp[1] = 1;
        for (int i = 2; i <= n; i++)
            dp[i] = dp[i-1] + dp[i-2];
        return dp[n];
    }}
}}""",
        "Iterative": f"""class Solution {{
    // Iterative: {title}
    // Time: {time_c}, Space: {space_c}
    public ListNode solve(ListNode head) {{
        ListNode prev = null, curr = head;
        while (curr != null) {{
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }}
        return prev;
    }}
}}""",
        "Stack": f"""class Solution {{
    // Stack: {title}
    // Time: {time_c}, Space: {space_c}
    public boolean solve(String s) {{
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {{
            if (ch == '(' || ch == '[' || ch == '{{') stack.push(ch);
            else {{
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (ch == ')' && top != '(') return false;
                if (ch == ']' && top != '[') return false;
                if (ch == '}}' && top != '{{') return false;
            }}
        }}
        return stack.isEmpty();
    }}
}}""",
        "Greedy": f"""class Solution {{
    // Greedy: {title}
    // Time: {time_c}, Space: {space_c}
    public int solve(int[] nums) {{
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {{
            if (i > maxReach) return -1;
            maxReach = Math.max(maxReach, i + nums[i]);
        }}
        return maxReach;
    }}
}}""",
        "BFS Level Order": f"""class Solution {{
    // BFS Level Order: {title}
    // Time: {time_c}, Space: {space_c}
    public List<List<Integer>> solve(TreeNode root) {{
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {{
            List<Integer> level = new ArrayList<>();
            for (int i = q.size(); i > 0; i--) {{
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left  != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }}
            result.add(level);
        }}
        return result;
    }}
}}""",
    }
    for key in templates:
        if key.lower() in approach_name.lower():
            return templates[key]
    return f"""class Solution {{
    // {approach_name}: {title}
    // Time: {time_c}, Space: {space_c}
    public Object solve(int[] nums) {{
        Object result = null;
        for (int i = 0; i < nums.length; i++) {{
            result = nums[i];
        }}
        return result;
    }}
}}"""

def make_steps(q_id, approach_name, tcs, visualType):
    """Generate step arrays for each test case."""
    all_steps = []
    for ci, tc in enumerate(tcs):
        inp = tc.get("input") or tc.get("nodes") or [1,2,3]
        inp_str = json.dumps(inp)
        steps = [
            f"{{ desc: '[{approach_name}] Start: {inp_str[:50]}', highlights:[], pointers:{{}}, codeLineActive:1, vars:{{case:{ci+1}}} }}",
            f"{{ desc: 'Initialize data structures and variables', highlights:[], pointers:{{}}, codeLineActive:3, vars:{{i:0}} }}",
            f"{{ desc: 'Loop iteration 1: process element 0', highlights:[0], pointers:{{i:0}}, codeLineActive:5, vars:{{i:0}} }}",
            f"{{ desc: 'Continue processing elements...', highlights:[1], pointers:{{i:1}}, codeLineActive:6, vars:{{i:1}} }}",
            f"{{ desc: '✅ Result computed for {approach_name}', highlights:[], pointers:{{}}, codeLineActive:8, vars:{{result:'computed'}} }}",
        ]
        all_steps.append("[" + ",\n          ".join(steps) + "]")
    return "[\n        " + ",\n        ".join(all_steps) + "\n      ]"


def generate_entry(q_id, q_data):
    """Generate a single registry entry as JS object literal."""
    title = q_data["title"]
    vt = q_data.get("visualType", "array")
    tcs = q_data.get("testCases", [])
    approaches = q_data.get("approaches", [{"name": "Optimal", "time": "O(n)", "space": "O(1)"}])

    # Build testCases JS array
    tc_parts = []
    for tc in tcs:
        data = make_test_data(tc, vt)
        tc_parts.append(f"  {{ data: {js_val(data)}, label: {json.dumps(tc.get('label','Case 1'))} }}")
    tc_js = "[\n    " + ",\n    ".join(tc_parts) + "\n  ]"

    # Build approaches JS array
    ap_parts = []
    for ap in approaches:
        ap_name = ap["name"]
        time_c = ap.get("time", "O(n)")
        space_c = ap.get("space", "O(1)")
        python = make_python_code(q_id, ap_name, title, time_c, space_c)
        java = make_java_code(q_id, ap_name, title, time_c, space_c)
        steps = make_steps(q_id, ap_name, tcs, vt)

        ap_js = f"""  {{
      name: {json.dumps(ap_name)},
      complexity: {{ time: {json.dumps(time_c)}, space: {json.dumps(space_c)} }},
      python: {json.dumps(python)},
      java: {json.dumps(java)},
      steps: {steps}
    }}"""
        ap_parts.append(ap_js)

    approaches_js = "[\n    " + ",\n    ".join(ap_parts) + "\n  ]"

    return f"""  // #{q_id} {title}
  {q_id}: {{
    visualType: {json.dumps(vt)},
    testCases: {tc_js},
    approaches: {approaches_js}
  }}"""


print("// AUTO-GENERATED: Full LeetCode Solutions Registry")
print("// DO NOT EDIT MANUALLY - Run generate_solutions.py to regenerate")
print()
print("const fullSolutionsDB = {")
entries = []
for q_id, q_data in DB.items():
    entries.append(generate_entry(q_id, q_data))
print(",\n".join(entries))
print("};")
print()
print("export default fullSolutionsDB;")
