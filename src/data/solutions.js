// ============================================================
// SOLUTIONS REGISTRY — Animated Visualizer Data
// Each entry: { visualType, approaches: [{ name, complexity, steps, code }], example }
// visualType: 'array' | 'tree' | 'graph' | 'dp' | 'linkedlist' | 'stack' | 'matrix' | 'backtrack'
// ============================================================

// ──────────────────────────────────────────────
// TEMPLATE HELPERS  (reused across questions)
// ──────────────────────────────────────────────
const mkArraySteps = (arr, extra) => [
  { desc: `Initialize array: [${arr.join(', ')}]`, highlights: [], pointers: {}, ...extra },
];

// ──────────────────────────────────────────────
// ARRAYS & HASHING
// ──────────────────────────────────────────────
const arraysHashing = {
  // 1 - Two Sum
  1: {
    visualType: 'array',
    example: { input: [2, 7, 11, 15], target: 9 },
    approaches: [
      {
        name: 'Brute Force',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        code: `for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] + nums[j] == target:
            return [i, j]`,
        steps: [
          { desc: 'Start with i=0. Check every pair.', highlights: [0], pointers: { i: 0 } },
          { desc: 'nums[0]=2, nums[1]=7. 2+7=9 ✓', highlights: [0, 1], pointers: { i: 0, j: 1 }, found: [0, 1] },
        ],
      },
      {
        name: 'HashMap (Optimal)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        return [seen[complement], i]
    seen[num] = i`,
        steps: [
          { desc: 'Initialize empty hashmap seen={}', highlights: [], pointers: {}, map: {} },
          { desc: 'i=0: num=2, complement=9-2=7. 7 not in map → store seen={2:0}', highlights: [0], pointers: { i: 0 }, map: { 2: 0 } },
          { desc: 'i=1: num=7, complement=9-7=2. 2 IS in map at index 0 → return [0,1] ✓', highlights: [0, 1], pointers: { i: 1 }, map: { 2: 0 }, found: [0, 1] },
        ],
      },
    ],
  },

  // 66 - Plus One
  66: {
    visualType: 'array',
    example: { input: [1, 2, 9] },
    approaches: [
      {
        name: 'Simulate Carry',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `for i in range(len(digits)-1, -1, -1):
    if digits[i] < 9:
        digits[i] += 1
        return digits
    digits[i] = 0
return [1] + digits`,
        steps: [
          { desc: 'Scan from right: digits[2]=9, set to 0, carry forward', highlights: [2], pointers: { i: 2 } },
          { desc: 'digits[1]=2, 2<9 so add 1 → digits[1]=3. Done!', highlights: [1], pointers: { i: 1 }, result: [1, 3, 0] },
        ],
      },
    ],
  },

  // 88 - Merge Sorted Array
  88: {
    visualType: 'array',
    example: { input: [1, 2, 3, 0, 0, 0], m: 3, nums2: [2, 5, 6], n: 3 },
    approaches: [
      {
        name: 'Three Pointers (from end)',
        complexity: { time: 'O(m+n)', space: 'O(1)' },
        code: `p1, p2, p = m-1, n-1, m+n-1
while p2 >= 0:
    if p1 >= 0 and nums1[p1] > nums2[p2]:
        nums1[p] = nums1[p1]; p1 -= 1
    else:
        nums1[p] = nums2[p2]; p2 -= 1
    p -= 1`,
        steps: [
          { desc: 'Place pointers at ends: p1=2(val=3), p2=2(val=6), p=5', highlights: [2, 5], pointers: { p1: 2, p2: 2, p: 5 } },
          { desc: '3 < 6, place 6 at pos 5. p2--, p--', highlights: [5], pointers: { p1: 2, p2: 1, p: 4 } },
          { desc: '3 < 5, place 5 at pos 4. p2--, p--', highlights: [4], pointers: { p1: 2, p2: 0, p: 3 } },
          { desc: '3 > 2, place 3 at pos 3. p1--, p--. Continue merging...', highlights: [3], pointers: { p1: 1, p2: 0, p: 2 }, result: [1, 2, 2, 3, 5, 6] },
        ],
      },
    ],
  },

  // 217 - Contains Duplicate
  217: {
    visualType: 'array',
    example: { input: [1, 2, 3, 1] },
    approaches: [
      {
        name: 'Brute Force',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        code: `for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] == nums[j]: return True
return False`,
        steps: [
          { desc: 'Compare every pair. i=0,j=1: 1≠2', highlights: [0, 1], pointers: { i: 0, j: 1 } },
          { desc: 'i=0,j=3: nums[0]=1, nums[3]=1 → DUPLICATE found!', highlights: [0, 3], pointers: { i: 0, j: 3 }, found: [0, 3] },
        ],
      },
      {
        name: 'HashSet (Optimal)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `seen = set()
for num in nums:
    if num in seen: return True
    seen.add(num)
return False`,
        steps: [
          { desc: 'seen={}. Add 1 → seen={1}', highlights: [0], pointers: { i: 0 }, map: { 1: 0 } },
          { desc: 'Add 2 → seen={1,2}', highlights: [1], pointers: { i: 1 }, map: { 1: 0, 2: 1 } },
          { desc: 'Add 3 → seen={1,2,3}', highlights: [2], pointers: { i: 2 }, map: { 1: 0, 2: 1, 3: 2 } },
          { desc: 'Check 1 → 1 is already in seen! DUPLICATE ✓', highlights: [3], pointers: { i: 3 }, map: { 1: 0, 2: 1, 3: 2 }, found: [0, 3] },
        ],
      },
    ],
  },

  // 242 - Valid Anagram
  242: {
    visualType: 'array',
    example: { input: 'anagram', target: 'nagaram' },
    approaches: [
      {
        name: 'Sort & Compare',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        code: `return sorted(s) == sorted(t)`,
        steps: [
          { desc: 'Sort s="anagram" → "aaagmnr"', highlights: [], pointers: {} },
          { desc: 'Sort t="nagaram" → "aaagmnr"', highlights: [], pointers: {} },
          { desc: '"aaagmnr" == "aaagmnr" → True ✓', highlights: [], pointers: {} },
        ],
      },
      {
        name: 'Character Count (Optimal)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `count = [0]*26
for c in s: count[ord(c)-ord('a')] += 1
for c in t: count[ord(c)-ord('a')] -= 1
return all(x==0 for x in count)`,
        steps: [
          { desc: 'Count chars in s="anagram": a→3,n→1,g→1,r→1,m→1', highlights: [], pointers: {}, map: { a: 3, n: 1, g: 1, r: 1, m: 1 } },
          { desc: 'Subtract chars in t="nagaram": counts become 0 for all', highlights: [], pointers: {}, map: { a: 0, n: 0, g: 0, r: 0, m: 0 } },
          { desc: 'All zeros → Valid Anagram ✓', highlights: [], pointers: {} },
        ],
      },
    ],
  },

  // 268 - Missing Number
  268: {
    visualType: 'array',
    example: { input: [3, 0, 1] },
    approaches: [
      {
        name: 'Sum Formula',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `n = len(nums)
return n*(n+1)//2 - sum(nums)`,
        steps: [
          { desc: 'n=3, expected sum = 3*4/2 = 6', highlights: [], pointers: {} },
          { desc: 'actual sum = 3+0+1 = 4', highlights: [0, 1, 2], pointers: {} },
          { desc: 'Missing = 6-4 = 2 ✓', highlights: [], pointers: {} },
        ],
      },
      {
        name: 'XOR Trick',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `res = len(nums)
for i, num in enumerate(nums):
    res ^= i ^ num
return res`,
        steps: [
          { desc: 'Start with res=3 (n)', highlights: [], pointers: {} },
          { desc: 'XOR with indices 0,1,2 and values 3,0,1', highlights: [0, 1, 2], pointers: {} },
          { desc: 'All pairs cancel → res=2 (missing) ✓', highlights: [], pointers: {} },
        ],
      },
    ],
  },

  // 169 - Majority Element
  169: {
    visualType: 'array',
    example: { input: [2, 2, 1, 1, 1, 2, 2] },
    approaches: [
      {
        name: 'HashMap Count',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `count = {}
for n in nums:
    count[n] = count.get(n, 0) + 1
    if count[n] > len(nums)//2:
        return n`,
        steps: [
          { desc: 'Count frequencies. count={2:1}', highlights: [0], pointers: { i: 0 }, map: { 2: 1 } },
          { desc: 'count={2:2}', highlights: [1], pointers: { i: 1 }, map: { 2: 2 } },
          { desc: 'count={2:2,1:1}', highlights: [2], pointers: { i: 2 }, map: { 2: 2, 1: 1 } },
          { desc: 'count={2:2,1:2}', highlights: [3], pointers: { i: 3 }, map: { 2: 2, 1: 2 } },
          { desc: 'count={2:2,1:3}. 3 > 7//2=3? No.', highlights: [4], pointers: { i: 4 }, map: { 2: 2, 1: 3 } },
          { desc: 'count={2:3,1:3}', highlights: [5], pointers: { i: 5 }, map: { 2: 3, 1: 3 } },
          { desc: 'count={2:4,1:3}. 4 > 3 → Majority=2 ✓', highlights: [6], pointers: { i: 6 }, map: { 2: 4, 1: 3 }, found: [0, 1, 5, 6] },
        ],
      },
      {
        name: "Boyer-Moore Voting (O(1) space)",
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `candidate, count = None, 0
for num in nums:
    if count == 0: candidate = num
    count += 1 if num == candidate else -1
return candidate`,
        steps: [
          { desc: 'count=0 → candidate=2, count=1', highlights: [0], pointers: { i: 0 } },
          { desc: 'nums[1]=2=candidate → count=2', highlights: [1], pointers: { i: 1 } },
          { desc: 'nums[2]=1≠candidate → count=1', highlights: [2], pointers: { i: 2 } },
          { desc: 'nums[3]=1≠candidate → count=0', highlights: [3], pointers: { i: 3 } },
          { desc: 'count=0 → candidate=1, count=1', highlights: [4], pointers: { i: 4 } },
          { desc: 'nums[5]=2≠candidate → count=0', highlights: [5], pointers: { i: 5 } },
          { desc: 'count=0 → candidate=2, count=1. Majority=2 ✓', highlights: [6], pointers: { i: 6 }, found: [6] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// TWO POINTERS
// ──────────────────────────────────────────────
const twoPointers = {
  26: {
    visualType: 'array',
    example: { input: [1, 1, 2, 3, 3] },
    approaches: [
      {
        name: 'Two Pointers',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `k = 1
for i in range(1, len(nums)):
    if nums[i] != nums[i-1]:
        nums[k] = nums[i]; k += 1
return k`,
        steps: [
          { desc: 'slow=1, fast=1. nums[1]=1=nums[0] → skip', highlights: [0, 1], pointers: { slow: 1, fast: 1 } },
          { desc: 'fast=2. nums[2]=2≠nums[1]=1 → nums[1]=2, slow=2', highlights: [1, 2], pointers: { slow: 2, fast: 2 } },
          { desc: 'fast=3. nums[3]=3≠nums[2] → nums[2]=3, slow=3', highlights: [2, 3], pointers: { slow: 3, fast: 3 } },
          { desc: 'fast=4. nums[4]=3=nums[3] → skip. Done! k=3 ✓', highlights: [3, 4], pointers: { slow: 3, fast: 4 }, result: [1, 2, 3] },
        ],
      },
    ],
  },

  125: {
    visualType: 'array',
    example: { input: 'A man a plan a canal Panama' },
    approaches: [
      {
        name: 'Two Pointers',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `l, r = 0, len(s)-1
while l < r:
    while l < r and not s[l].isalnum(): l += 1
    while l < r and not s[r].isalnum(): r -= 1
    if s[l].lower() != s[r].lower(): return False
    l += 1; r -= 1
return True`,
        steps: [
          { desc: 'Clean: "amanaplanacanalpanama". l=0(a), r=19(a)', highlights: [0, 19], pointers: { L: 0, R: 19 } },
          { desc: 'a==a ✓, move inward: l=1(m), r=18(m)', highlights: [1, 18], pointers: { L: 1, R: 18 } },
          { desc: 'm==m ✓, continue...', highlights: [2, 17], pointers: { L: 2, R: 17 } },
          { desc: 'All chars match → Valid Palindrome ✓', highlights: [], pointers: {} },
        ],
      },
    ],
  },

  167: {
    visualType: 'array',
    example: { input: [2, 7, 11, 15], target: 9 },
    approaches: [
      {
        name: 'Two Pointers',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `l, r = 0, len(numbers)-1
while l < r:
    s = numbers[l] + numbers[r]
    if s == target: return [l+1, r+1]
    elif s < target: l += 1
    else: r -= 1`,
        steps: [
          { desc: 'l=0(val=2), r=3(val=15). sum=17 > 9 → r--', highlights: [0, 3], pointers: { L: 0, R: 3 } },
          { desc: 'l=0(val=2), r=2(val=11). sum=13 > 9 → r--', highlights: [0, 2], pointers: { L: 0, R: 2 } },
          { desc: 'l=0(val=2), r=1(val=7). sum=9 == 9 → return [1,2] ✓', highlights: [0, 1], pointers: { L: 0, R: 1 }, found: [0, 1] },
        ],
      },
    ],
  },

  11: {
    visualType: 'array',
    example: { input: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    approaches: [
      {
        name: 'Two Pointers (Greedy)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `l, r = 0, len(height)-1
res = 0
while l < r:
    res = max(res, min(height[l], height[r]) * (r-l))
    if height[l] < height[r]: l += 1
    else: r -= 1
return res`,
        steps: [
          { desc: 'l=0(h=1), r=8(h=7). water=min(1,7)*8=8. h[l]<h[r]→l++', highlights: [0, 8], pointers: { L: 0, R: 8 } },
          { desc: 'l=1(h=8), r=8(h=7). water=min(8,7)*7=49. h[l]>h[r]→r--', highlights: [1, 8], pointers: { L: 1, R: 8 } },
          { desc: 'l=1(h=8), r=7(h=3). water=min(8,3)*6=18. Continue...', highlights: [1, 7], pointers: { L: 1, R: 7 } },
          { desc: 'Best: 49 units of water ✓', highlights: [1, 8], pointers: {} },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// SLIDING WINDOW
// ──────────────────────────────────────────────
const slidingWindow = {
  121: {
    visualType: 'array',
    example: { input: [7, 1, 5, 3, 6, 4] },
    approaches: [
      {
        name: 'Sliding Window',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `minPrice = float('inf')
maxProfit = 0
for price in prices:
    minPrice = min(minPrice, price)
    maxProfit = max(maxProfit, price - minPrice)
return maxProfit`,
        steps: [
          { desc: 'price=7, minPrice=7, maxProfit=0', highlights: [0], pointers: { buy: 0 } },
          { desc: 'price=1, minPrice=1, maxProfit=0', highlights: [1], pointers: { buy: 1 } },
          { desc: 'price=5, minPrice=1, maxProfit=4', highlights: [2], pointers: { buy: 1, sell: 2 } },
          { desc: 'price=3, minPrice=1, maxProfit=4', highlights: [3], pointers: { buy: 1, sell: 2 } },
          { desc: 'price=6, minPrice=1, maxProfit=5', highlights: [4], pointers: { buy: 1, sell: 4 } },
          { desc: 'price=4, minPrice=1, maxProfit=5. Result=5 ✓', highlights: [5], pointers: { buy: 1, sell: 4 }, found: [1, 4] },
        ],
      },
    ],
  },

  3: {
    visualType: 'array',
    example: { input: 'abcabcbb' },
    approaches: [
      {
        name: 'Sliding Window + Set',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `l = 0; seen = set(); res = 0
for r in range(len(s)):
    while s[r] in seen:
        seen.remove(s[l]); l += 1
    seen.add(s[r])
    res = max(res, r - l + 1)
return res`,
        steps: [
          { desc: 'l=0,r=0: add "a". window="a", len=1', highlights: [0], pointers: { L: 0, R: 0 } },
          { desc: 'r=1: add "b". window="ab", len=2', highlights: [0, 1], pointers: { L: 0, R: 1 } },
          { desc: 'r=2: add "c". window="abc", len=3', highlights: [0, 1, 2], pointers: { L: 0, R: 2 } },
          { desc: 'r=3: "a" already in set! Remove "a", l=1', highlights: [1, 2, 3], pointers: { L: 1, R: 3 } },
          { desc: 'Continue... max window=3 ("abc") ✓', highlights: [0, 1, 2], pointers: {}, found: [0, 1, 2] },
        ],
      },
    ],
  },

  209: {
    visualType: 'array',
    example: { input: [2, 3, 1, 2, 4, 3], target: 7 },
    approaches: [
      {
        name: 'Sliding Window (Shrink)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `l = 0; total = 0; res = float('inf')
for r in range(len(nums)):
    total += nums[r]
    while total >= target:
        res = min(res, r-l+1)
        total -= nums[l]; l += 1
return res if res != float('inf') else 0`,
        steps: [
          { desc: 'Expand r. total=2+3+1+2=8≥7. window=[0..3] len=4', highlights: [0, 1, 2, 3], pointers: { L: 0, R: 3 } },
          { desc: 'Shrink: remove nums[0]=2. total=6<7. l=1', highlights: [1, 2, 3], pointers: { L: 1, R: 3 } },
          { desc: 'Expand r=4: total=6+4=10≥7. window=[1..4] len=4→res=4', highlights: [1, 2, 3, 4], pointers: { L: 1, R: 4 } },
          { desc: 'Shrink: l=2 total=7. Still ≥7. res=3', highlights: [2, 3, 4], pointers: { L: 2, R: 4 } },
          { desc: 'Shrink: l=3 total=6<7. r=5: total=9≥7. res=2 ✓', highlights: [4, 5], pointers: { L: 4, R: 5 }, found: [4, 5] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// BINARY SEARCH
// ──────────────────────────────────────────────
const binarySearch = {
  35: {
    visualType: 'array',
    example: { input: [1, 3, 5, 6], target: 5 },
    approaches: [
      {
        name: 'Binary Search',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        code: `l, r = 0, len(nums)
while l < r:
    m = (l+r)//2
    if nums[m] < target: l = m+1
    else: r = m
return l`,
        steps: [
          { desc: 'l=0, r=4. mid=2. nums[2]=5≥5 → r=2', highlights: [2], pointers: { L: 0, R: 4, M: 2 } },
          { desc: 'l=0, r=2. mid=1. nums[1]=3<5 → l=2', highlights: [1], pointers: { L: 0, R: 2, M: 1 } },
          { desc: 'l=2, r=2. l==r → return 2 ✓', highlights: [2], pointers: { L: 2, R: 2 }, found: [2] },
        ],
      },
    ],
  },

  704: {
    visualType: 'array',
    example: { input: [-1, 0, 3, 5, 9, 12], target: 9 },
    approaches: [
      {
        name: 'Classic Binary Search',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        code: `l, r = 0, len(nums)-1
while l <= r:
    mid = (l+r)//2
    if nums[mid] == target: return mid
    elif nums[mid] < target: l = mid+1
    else: r = mid-1`,
        steps: [
          { desc: 'l=0, r=5. mid=2. nums[2]=3<9 → l=3', highlights: [2], pointers: { L: 0, R: 5, M: 2 } },
          { desc: 'l=3, r=5. mid=4. nums[4]=9==9 → return 4 ✓', highlights: [4], pointers: { L: 3, R: 5, M: 4 }, found: [4] },
        ],
      },
    ],
  },

  153: {
    visualType: 'array',
    example: { input: [3, 4, 5, 1, 2] },
    approaches: [
      {
        name: 'Binary Search (Find Pivot)',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        code: `l, r = 0, len(nums)-1
while l < r:
    mid = (l+r)//2
    if nums[mid] > nums[r]: l = mid+1
    else: r = mid
return nums[l]`,
        steps: [
          { desc: 'l=0, r=4. mid=2. nums[2]=5>nums[4]=2 → l=3 (pivot right)', highlights: [2], pointers: { L: 0, R: 4, M: 2 } },
          { desc: 'l=3, r=4. mid=3. nums[3]=1<nums[4]=2 → r=3', highlights: [3], pointers: { L: 3, R: 4, M: 3 } },
          { desc: 'l==r=3. Minimum=nums[3]=1 ✓', highlights: [3], pointers: { L: 3, R: 3 }, found: [3] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// STACK
// ──────────────────────────────────────────────
const stack = {
  20: {
    visualType: 'stack',
    example: { input: '({[]})' },
    approaches: [
      {
        name: 'Stack Matching',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `stack = []
pairs = {')':'(', '}':'{', ']':'['}
for c in s:
    if c in '({[': stack.append(c)
    elif not stack or stack[-1] != pairs[c]: return False
    else: stack.pop()
return not stack`,
        steps: [
          { desc: "Push '(' → stack=['(']", stackState: ['('], current: '(' },
          { desc: "Push '{' → stack=['(', '{']", stackState: ['(', '{'], current: '{' },
          { desc: "Push '[' → stack=['(', '{', '[']", stackState: ['(', '{', '['], current: '[' },
          { desc: "']' matches '[' → pop. stack=['(', '{']", stackState: ['(', '{'], current: ']' },
          { desc: "'}' matches '{' → pop. stack=['(']", stackState: ['('], current: '}' },
          { desc: "')' matches '(' → pop. stack=[]. Empty → Valid ✓", stackState: [], current: ')' },
        ],
      },
    ],
  },

  155: {
    visualType: 'stack',
    example: { input: 'push(5),push(3),getMin,pop,getMin' },
    approaches: [
      {
        name: 'Double Stack',
        complexity: { time: 'O(1)', space: 'O(n)' },
        code: `self.stack = []
self.minStack = []
def push(val):
    self.stack.append(val)
    m = min(val, self.minStack[-1] if self.minStack else val)
    self.minStack.append(m)
def getMin(): return self.minStack[-1]`,
        steps: [
          { desc: 'push(5): stack=[5], minStack=[5]', stackState: [5], stackState2: [5] },
          { desc: 'push(3): stack=[5,3], minStack=[5,3]', stackState: [5, 3], stackState2: [5, 3] },
          { desc: 'getMin() → minStack[-1]=3 ✓', stackState: [5, 3], stackState2: [5, 3] },
          { desc: 'pop(): stack=[5], minStack=[5]', stackState: [5], stackState2: [5] },
          { desc: 'getMin() → minStack[-1]=5 ✓', stackState: [5], stackState2: [5] },
        ],
      },
    ],
  },

  739: {
    visualType: 'stack',
    example: { input: [73, 74, 75, 71, 69, 72, 76, 73] },
    approaches: [
      {
        name: 'Monotonic Stack',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `res = [0]*len(temps)
stack = []  # [temp, index]
for i, t in enumerate(temps):
    while stack and t > stack[-1][0]:
        stackT, stackI = stack.pop()
        res[stackI] = i - stackI
    stack.append([t, i])
return res`,
        steps: [
          { desc: 'i=0: push (73,0). stack=[(73,0)]', stackState: ['73@0'], current: 73 },
          { desc: 'i=1: 74>73 → pop (73,0), res[0]=1. push (74,1)', stackState: ['74@1'], current: 74 },
          { desc: 'i=2: 75>74 → pop (74,1), res[1]=1. push (75,2)', stackState: ['75@2'], current: 75 },
          { desc: 'i=3: 71<75 → push (71,3). stack=[(75,2),(71,3)]', stackState: ['75@2', '71@3'], current: 71 },
          { desc: 'i=4: 69<71 → push. i=5: 72>69,71 → pop both, res[4]=1,res[3]=2', stackState: ['75@2', '72@5'], current: 72 },
          { desc: 'i=6: 76>75,72 → pop both. res[2]=4, res[5]=1. Final=[1,1,4,2,1,1,0,0] ✓', stackState: ['76@6'], current: 76 },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// LINKED LIST
// ──────────────────────────────────────────────
const linkedList = {
  21: {
    visualType: 'linkedlist',
    example: { list1: [1, 2, 4], list2: [1, 3, 4] },
    approaches: [
      {
        name: 'Iterative Merge',
        complexity: { time: 'O(m+n)', space: 'O(1)' },
        code: `dummy = ListNode(0)
cur = dummy
while l1 and l2:
    if l1.val <= l2.val: cur.next = l1; l1 = l1.next
    else: cur.next = l2; l2 = l2.next
    cur = cur.next
cur.next = l1 or l2
return dummy.next`,
        steps: [
          { desc: 'dummy→? Compare 1 vs 1 (equal), take l1[1]', nodes: [0, 1, 2, 4, 1, 3, 4], highlighted: [1, 4] },
          { desc: 'Take l2[1]. result: 1→1', nodes: [0, 1, 1, 2, 4, 3, 4], highlighted: [1, 4] },
          { desc: 'Compare 2 vs 3 → take l1[2]', nodes: [0, 1, 1, 2, 4, 3, 4], highlighted: [2, 5] },
          { desc: 'Compare 4 vs 3 → take l2[3]', nodes: [0, 1, 1, 2, 3, 4, 4], highlighted: [4, 5] },
          { desc: 'Take l1[4], then l2[4]. Result: 1→1→2→3→4→4 ✓', nodes: [1, 1, 2, 3, 4, 4], highlighted: [] },
        ],
      },
    ],
  },

  206: {
    visualType: 'linkedlist',
    example: { input: [1, 2, 3, 4, 5] },
    approaches: [
      {
        name: 'Iterative',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `prev = None; cur = head
while cur:
    next = cur.next
    cur.next = prev
    prev = cur; cur = next
return prev`,
        steps: [
          { desc: 'prev=None, cur=1. Save next=2, point 1→None', nodes: [1, 2, 3, 4, 5], highlighted: [0], pointers: { cur: 0 } },
          { desc: 'prev=1, cur=2. Point 2→1', nodes: [2, 1, 3, 4, 5], highlighted: [0, 1], pointers: { cur: 1 } },
          { desc: 'prev=2, cur=3. Point 3→2', nodes: [3, 2, 1, 4, 5], highlighted: [0, 1, 2], pointers: { cur: 2 } },
          { desc: 'Continue... Result: 5→4→3→2→1 ✓', nodes: [5, 4, 3, 2, 1], highlighted: [] },
        ],
      },
      {
        name: 'Recursive',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `def reverse(node):
    if not node or not node.next: return node
    new_head = reverse(node.next)
    node.next.next = node
    node.next = None
    return new_head`,
        steps: [
          { desc: 'Recurse to end: reverse(5). Base case returns 5', nodes: [1, 2, 3, 4, 5], highlighted: [4] },
          { desc: 'Unwind: 5.next=4, 4.next=None', nodes: [5, 4, 3, 2, 1], highlighted: [3, 4] },
          { desc: 'Unwind: 4.next=3, 3.next=None. Continue unwinding...', nodes: [5, 4, 3, 2, 1], highlighted: [2, 3] },
          { desc: 'Final: 5→4→3→2→1 ✓', nodes: [5, 4, 3, 2, 1], highlighted: [] },
        ],
      },
    ],
  },

  141: {
    visualType: 'linkedlist',
    example: { input: [3, 2, 0, -4], pos: 1 },
    approaches: [
      {
        name: "Floyd's Cycle Detection",
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: return True
return False`,
        steps: [
          { desc: 'slow=3, fast=3. Both at head', nodes: [3, 2, 0, -4], highlighted: [0], pointers: { slow: 0, fast: 0 } },
          { desc: 'slow→2, fast→0 (skips 2). Diff positions', nodes: [3, 2, 0, -4], highlighted: [1, 2], pointers: { slow: 1, fast: 2 } },
          { desc: 'slow→0, fast→2 (wraps via cycle). Getting closer!', nodes: [3, 2, 0, -4], highlighted: [2, 1], pointers: { slow: 2, fast: 1 } },
          { desc: 'slow→-4, fast→-4. slow==fast → CYCLE DETECTED ✓', nodes: [3, 2, 0, -4], highlighted: [3], pointers: { slow: 3, fast: 3 }, found: [3] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// TREES
// ──────────────────────────────────────────────
const trees = {
  94: {
    visualType: 'tree',
    example: { tree: { val: 1, right: { val: 2, left: { val: 3 } } } },
    approaches: [
      {
        name: 'Recursive DFS',
        complexity: { time: 'O(n)', space: 'O(h)' },
        code: `def inorder(node, res=[]):
    if not node: return
    inorder(node.left, res)
    res.append(node.val)
    inorder(node.right, res)`,
        steps: [
          { desc: 'Visit left subtree of 1 → null → backtrack', traversalOrder: [], currentNode: 1 },
          { desc: 'Append 1 to result. result=[1]', traversalOrder: [1], currentNode: 1 },
          { desc: 'Go right to 2. Visit left of 2 → node 3', traversalOrder: [1], currentNode: 2 },
          { desc: 'Append 3. result=[1,3]', traversalOrder: [1, 3], currentNode: 3 },
          { desc: 'Back to 2. Append 2. result=[1,3,2] ✓', traversalOrder: [1, 3, 2], currentNode: 2 },
        ],
      },
      {
        name: 'Iterative (Stack)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `res, stack, cur = [], [], root
while cur or stack:
    while cur: stack.append(cur); cur = cur.left
    cur = stack.pop(); res.append(cur.val)
    cur = cur.right`,
        steps: [
          { desc: 'Push 1 to stack. Go left → null', traversalOrder: [], currentNode: 1 },
          { desc: 'Pop 1, append. result=[1]. Go right to 2', traversalOrder: [1], currentNode: 2 },
          { desc: 'Push 2. Go left to 3. Push 3. Go left → null', traversalOrder: [1], currentNode: 3 },
          { desc: 'Pop 3, append. result=[1,3]. Go right → null', traversalOrder: [1, 3], currentNode: 3 },
          { desc: 'Pop 2, append. result=[1,3,2] ✓', traversalOrder: [1, 3, 2], currentNode: 2 },
        ],
      },
    ],
  },

  104: {
    visualType: 'tree',
    example: { tree: { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } } },
    approaches: [
      {
        name: 'Recursive DFS',
        complexity: { time: 'O(n)', space: 'O(h)' },
        code: `def maxDepth(root):
    if not root: return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
        steps: [
          { desc: 'Node 3: recurse into left (9) and right (20)', traversalOrder: [], currentNode: 3 },
          { desc: 'Node 9: no children → return 1', traversalOrder: [9], currentNode: 9 },
          { desc: 'Node 20: recurse into 15 and 7', traversalOrder: [20], currentNode: 20 },
          { desc: 'Node 15: return 1. Node 7: return 1.', traversalOrder: [15, 7], currentNode: 15 },
          { desc: 'Node 20 returns 1+max(1,1)=2. Node 3 returns 1+max(1,2)=3 ✓', traversalOrder: [3, 9, 20, 15, 7], currentNode: 3 },
        ],
      },
      {
        name: 'BFS Level Order',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `from collections import deque
q = deque([root]); depth = 0
while q:
    for _ in range(len(q)):
        node = q.popleft()
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)
    depth += 1
return depth`,
        steps: [
          { desc: 'Level 1: [3]. depth=1', traversalOrder: [3], currentNode: 3 },
          { desc: 'Level 2: [9, 20]. depth=2', traversalOrder: [3, 9, 20], currentNode: 9 },
          { desc: 'Level 3: [15, 7]. depth=3', traversalOrder: [3, 9, 20, 15, 7], currentNode: 15 },
          { desc: 'Queue empty → maxDepth=3 ✓', traversalOrder: [3, 9, 20, 15, 7], currentNode: null },
        ],
      },
    ],
  },

  226: {
    visualType: 'tree',
    example: { tree: { val: 4, left: { val: 2, left: { val: 1 }, right: { val: 3 } }, right: { val: 7, left: { val: 6 }, right: { val: 9 } } } },
    approaches: [
      {
        name: 'Recursive (Post-order)',
        complexity: { time: 'O(n)', space: 'O(h)' },
        code: `def invertTree(root):
    if not root: return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
        steps: [
          { desc: 'Recurse to leaves first. Node 1: no children → return', traversalOrder: [1], currentNode: 1 },
          { desc: 'Node 2: swap left(1) and right(3). children flipped!', traversalOrder: [1, 3, 2], currentNode: 2 },
          { desc: 'Node 6,9 returned. Node 7: swap → right=6, left=9', traversalOrder: [6, 9, 7], currentNode: 7 },
          { desc: 'Root 4: swap → left=7, right=2. DONE ✓', traversalOrder: [4, 7, 2], currentNode: 4 },
        ],
      },
    ],
  },

  102: {
    visualType: 'tree',
    example: { tree: { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } } },
    approaches: [
      {
        name: 'BFS Level Order',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `from collections import deque
res = []; q = deque([root])
while q:
    level = []
    for _ in range(len(q)):
        node = q.popleft()
        level.append(node.val)
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)
    res.append(level)`,
        steps: [
          { desc: 'Queue: [3]. Process level 1 → [[3]]', traversalOrder: [3], currentNode: 3 },
          { desc: 'Queue: [9,20]. Process level 2 → [[3],[9,20]]', traversalOrder: [3, 9, 20], currentNode: 9 },
          { desc: 'Queue: [15,7]. Process level 3 → [[3],[9,20],[15,7]] ✓', traversalOrder: [3, 9, 20, 15, 7], currentNode: 15 },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// GRAPHS
// ──────────────────────────────────────────────
const graphs = {
  200: {
    visualType: 'matrix',
    example: { grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']] },
    approaches: [
      {
        name: 'DFS Flood Fill',
        complexity: { time: 'O(m·n)', space: 'O(m·n)' },
        code: `def dfs(r, c):
    if r<0 or c<0 or r>=rows or c>=cols or grid[r][c]=='0': return
    grid[r][c] = '0'
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
for r in range(rows):
    for c in range(cols):
        if grid[r][c] == '1': count += 1; dfs(r,c)`,
        steps: [
          { desc: 'Find land at (0,0). DFS → mark island 1 as visited', highlights: [[0,0],[0,1],[1,0],[1,1]], current: [0,0] },
          { desc: 'Find land at (2,2). DFS → mark island 2', highlights: [[2,2]], current: [2,2] },
          { desc: 'Find land at (3,3). DFS → mark island 3 (includes 3,4)', highlights: [[3,3],[3,4]], current: [3,3] },
          { desc: 'Total islands = 3 ✓', highlights: [], current: null },
        ],
      },
      {
        name: 'BFS',
        complexity: { time: 'O(m·n)', space: 'O(min(m,n))' },
        code: `from collections import deque
for r in range(rows):
    for c in range(cols):
        if grid[r][c]=='1':
            count += 1
            q = deque([(r,c)]); grid[r][c]='0'
            while q:
                row,col = q.popleft()
                for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                    if 0<=row+dr<rows and 0<=col+dc<cols and grid[row+dr][col+dc]=='1':
                        q.append((row+dr,col+dc)); grid[row+dr][col+dc]='0'`,
        steps: [
          { desc: 'BFS from (0,0): queue [(0,0)]. Mark visited', highlights: [[0,0]], current: [0,0] },
          { desc: 'Process (0,0): add neighbors (0,1),(1,0)', highlights: [[0,0],[0,1],[1,0]], current: [0,1] },
          { desc: 'Continue BFS. Island 1 = {(0,0),(0,1),(1,0),(1,1)}', highlights: [[0,0],[0,1],[1,0],[1,1]], current: [1,1] },
          { desc: 'Found 3 islands total ✓', highlights: [], current: null },
        ],
      },
    ],
  },

  207: {
    visualType: 'graph',
    example: { nodes: [0,1,2,3], edges: [[1,0],[2,1],[3,2]] },
    approaches: [
      {
        name: 'DFS + Cycle Detection',
        complexity: { time: 'O(V+E)', space: 'O(V+E)' },
        code: `adj = defaultdict(list)
for a,b in prerequisites: adj[a].append(b)
visiting = set(); visited = set()
def dfs(node):
    if node in visiting: return False  # cycle!
    if node in visited: return True
    visiting.add(node)
    for nei in adj[node]:
        if not dfs(nei): return False
    visiting.remove(node); visited.add(node)
    return True`,
        steps: [
          { desc: 'Build adjacency list. Start DFS from course 0', highlightedNodes: [0], highlightedEdges: [] },
          { desc: 'DFS: 0→1→2→3. All reachable. Add to visited', highlightedNodes: [0,1,2,3], highlightedEdges: [[0,1],[1,2],[2,3]] },
          { desc: 'No cycles detected → can finish all courses ✓', highlightedNodes: [], highlightedEdges: [] },
        ],
      },
    ],
  },

  133: {
    visualType: 'graph',
    example: { nodes: [1,2,3,4], edges: [[1,2],[1,4],[2,3],[3,4]] },
    approaches: [
      {
        name: 'DFS Clone',
        complexity: { time: 'O(V+E)', space: 'O(V)' },
        code: `cloned = {}
def dfs(node):
    if node in cloned: return cloned[node]
    copy = Node(node.val)
    cloned[node] = copy
    for nei in node.neighbors:
        copy.neighbors.append(dfs(nei))
    return copy`,
        steps: [
          { desc: 'DFS from node 1. Create clone of node 1', highlightedNodes: [1], highlightedEdges: [] },
          { desc: 'Visit neighbor 2. Clone node 2, link 1→2', highlightedNodes: [1,2], highlightedEdges: [[1,2]] },
          { desc: 'Visit neighbor 3. Clone node 3, link 2→3', highlightedNodes: [1,2,3], highlightedEdges: [[1,2],[2,3]] },
          { desc: 'Visit neighbor 4. Clone node 4, link 3→4, 4→1. Done ✓', highlightedNodes: [1,2,3,4], highlightedEdges: [[1,2],[2,3],[3,4],[4,1]] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// 1-D DYNAMIC PROGRAMMING
// ──────────────────────────────────────────────
const dp1D = {
  70: {
    visualType: 'dp',
    example: { input: 5 },
    approaches: [
      {
        name: 'Recursion with Memoization',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `memo = {}
def climb(n):
    if n <= 1: return 1
    if n in memo: return memo[n]
    memo[n] = climb(n-1) + climb(n-2)
    return memo[n]`,
        steps: [
          { desc: 'dp[0]=1, dp[1]=1 (base cases)', dpArr: [1, 1, 0, 0, 0, 0], highlighted: [0, 1] },
          { desc: 'dp[2]=dp[1]+dp[0]=2', dpArr: [1, 1, 2, 0, 0, 0], highlighted: [2] },
          { desc: 'dp[3]=dp[2]+dp[1]=3', dpArr: [1, 1, 2, 3, 0, 0], highlighted: [3] },
          { desc: 'dp[4]=dp[3]+dp[2]=5', dpArr: [1, 1, 2, 3, 5, 0], highlighted: [4] },
          { desc: 'dp[5]=dp[4]+dp[3]=8. Answer=8 ✓', dpArr: [1, 1, 2, 3, 5, 8], highlighted: [5] },
        ],
      },
      {
        name: 'Bottom-Up DP (O(1) space)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `a, b = 1, 1
for _ in range(2, n+1):
    a, b = b, a + b
return b`,
        steps: [
          { desc: 'a=1 (dp[0]), b=1 (dp[1])', dpArr: [1, 1], highlighted: [0, 1] },
          { desc: 'Step 2: a=1, b=1+1=2', dpArr: [1, 2], highlighted: [1] },
          { desc: 'Step 3: a=2, b=1+2=3', dpArr: [2, 3], highlighted: [1] },
          { desc: 'Step 4: a=3, b=2+3=5', dpArr: [3, 5], highlighted: [1] },
          { desc: 'Step 5: a=5, b=3+5=8. return b=8 ✓', dpArr: [5, 8], highlighted: [1] },
        ],
      },
    ],
  },

  198: {
    visualType: 'dp',
    example: { input: [2, 7, 9, 3, 1] },
    approaches: [
      {
        name: 'Bottom-Up DP',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `dp = [0] * len(nums)
dp[0] = nums[0]
dp[1] = max(nums[0], nums[1])
for i in range(2, len(nums)):
    dp[i] = max(dp[i-1], dp[i-2] + nums[i])`,
        steps: [
          { desc: 'dp[0]=2 (rob house 0)', dpArr: [2, 0, 0, 0, 0], highlighted: [0] },
          { desc: 'dp[1]=max(2,7)=7 (skip house 0)', dpArr: [2, 7, 0, 0, 0], highlighted: [1] },
          { desc: 'dp[2]=max(7, 2+9)=11 (rob house 2 with house 0)', dpArr: [2, 7, 11, 0, 0], highlighted: [2] },
          { desc: 'dp[3]=max(11, 7+3)=11', dpArr: [2, 7, 11, 11, 0], highlighted: [3] },
          { desc: 'dp[4]=max(11, 11+1)=12. Answer=12 ✓', dpArr: [2, 7, 11, 11, 12], highlighted: [4] },
        ],
      },
    ],
  },

  322: {
    visualType: 'dp',
    example: { input: [1, 5, 6], amount: 11 },
    approaches: [
      {
        name: 'Bottom-Up DP',
        complexity: { time: 'O(amount × coins)', space: 'O(amount)' },
        code: `dp = [amount+1] * (amount+1)
dp[0] = 0
for a in range(1, amount+1):
    for c in coins:
        if a - c >= 0:
            dp[a] = min(dp[a], 1 + dp[a-c])`,
        steps: [
          { desc: 'dp=[0,∞,∞,...,∞]. dp[0]=0 (0 coins for amount 0)', dpArr: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], highlighted: [0] },
          { desc: 'dp[1]=min(∞, 1+dp[0])=1 (coin=1)', dpArr: [0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], highlighted: [1] },
          { desc: 'dp[5]=1 (coin=5)', dpArr: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 3], highlighted: [5] },
          { desc: 'dp[6]=1 (coin=6)', dpArr: [0, 1, 2, 3, 4, 1, 1, 2, 3, 2, 2, 2], highlighted: [6] },
          { desc: 'dp[11]=min(dp[10]+1,dp[6]+1,dp[5]+1)=2. Answer=2 ✓', dpArr: [0, 1, 2, 3, 4, 1, 1, 2, 3, 2, 2, 2], highlighted: [11] },
        ],
      },
    ],
  },

  300: {
    visualType: 'dp',
    example: { input: [10, 9, 2, 5, 3, 7, 101, 18] },
    approaches: [
      {
        name: 'DP O(n²)',
        complexity: { time: 'O(n²)', space: 'O(n)' },
        code: `dp = [1] * len(nums)
for i in range(1, len(nums)):
    for j in range(i):
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j]+1)
return max(dp)`,
        steps: [
          { desc: 'All dp[i]=1 (each element alone is LIS of length 1)', dpArr: [1,1,1,1,1,1,1,1], highlighted: [] },
          { desc: 'i=3(val=5): 2<5 → dp[3]=max(1,dp[2]+1)=2', dpArr: [1,1,1,2,1,1,1,1], highlighted: [3] },
          { desc: 'i=4(val=3): 2<3 → dp[4]=max(1,dp[2]+1)=2', dpArr: [1,1,1,2,2,1,1,1], highlighted: [4] },
          { desc: 'i=5(val=7): 2<7,5<7,3<7 → dp[5]=max(dp[3],dp[4])+1=3', dpArr: [1,1,1,2,2,3,1,1], highlighted: [5] },
          { desc: 'i=6(val=101): all before smaller → dp[6]=4', dpArr: [1,1,1,2,2,3,4,1], highlighted: [6] },
          { desc: 'max(dp)=4. LIS=[2,3,7,101] or [2,5,7,101] ✓', dpArr: [1,1,1,2,2,3,4,4], highlighted: [] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// 2-D DYNAMIC PROGRAMMING
// ──────────────────────────────────────────────
const dp2D = {
  62: {
    visualType: 'dp2d',
    example: { m: 3, n: 3 },
    approaches: [
      {
        name: '2D DP Table',
        complexity: { time: 'O(m·n)', space: 'O(m·n)' },
        code: `dp = [[1]*n for _ in range(m)]
for r in range(1,m):
    for c in range(1,n):
        dp[r][c] = dp[r-1][c] + dp[r][c-1]
return dp[m-1][n-1]`,
        steps: [
          { desc: 'Initialize: top row and left col = 1 (only one way)', dpGrid: [[1,1,1],[1,0,0],[1,0,0]], highlighted: [[0,0],[0,1],[0,2],[1,0],[2,0]] },
          { desc: 'dp[1][1]=dp[0][1]+dp[1][0]=1+1=2', dpGrid: [[1,1,1],[1,2,0],[1,0,0]], highlighted: [[1,1]] },
          { desc: 'dp[1][2]=dp[0][2]+dp[1][1]=1+2=3', dpGrid: [[1,1,1],[1,2,3],[1,0,0]], highlighted: [[1,2]] },
          { desc: 'dp[2][1]=dp[1][1]+dp[2][0]=2+1=3', dpGrid: [[1,1,1],[1,2,3],[1,3,0]], highlighted: [[2,1]] },
          { desc: 'dp[2][2]=dp[1][2]+dp[2][1]=3+3=6 ✓', dpGrid: [[1,1,1],[1,2,3],[1,3,6]], highlighted: [[2,2]] },
        ],
      },
    ],
  },

  1143: {
    visualType: 'dp2d',
    example: { text1: 'ABCBDAB', text2: 'BDCAB' },
    approaches: [
      {
        name: 'LCS DP Table',
        complexity: { time: 'O(m·n)', space: 'O(m·n)' },
        code: `m,n = len(text1), len(text2)
dp = [[0]*(n+1) for _ in range(m+1)]
for i in range(1,m+1):
    for j in range(1,n+1):
        if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1
        else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])
return dp[m][n]`,
        steps: [
          { desc: 'Initialize: dp[0][*]=0, dp[*][0]=0', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]], highlighted: [] },
          { desc: 'A≠B→max(0,0)=0. A≠D→0. A≠C→0. A=A→dp[1][4]=1. A≠B→1', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,1,1],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]], highlighted: [[1,4]] },
          { desc: 'Fill row 2 (B): B=B→dp[2][1]=1. Continue...', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,1,1],[0,1,1,1,1,2],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]], highlighted: [[2,1]] },
          { desc: 'dp[7][5]=4. LCS length=4 (BCAB or BDAB) ✓', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,1,1],[0,1,1,1,1,2],[0,1,2,2,2,2],[0,1,2,2,3,3],[0,1,2,2,3,4],[0,1,2,3,3,4],[0,1,2,3,4,4]], highlighted: [[7,5]] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// BACKTRACKING
// ──────────────────────────────────────────────
const backtracking = {
  39: {
    visualType: 'backtrack',
    example: { candidates: [2, 3, 6, 7], target: 7 },
    approaches: [
      {
        name: 'Backtracking with Pruning',
        complexity: { time: 'O(n^(T/M))', space: 'O(T/M)' },
        code: `def backtrack(i, current, total):
    if total == target: result.append(current[:])
    if total >= target or i >= len(candidates): return
    current.append(candidates[i])
    backtrack(i, current, total + candidates[i])
    current.pop()
    backtrack(i+1, current, total)`,
        steps: [
          { desc: 'Start: [] total=0. Try candidates[0]=2', path: [], highlights: [0] },
          { desc: '[2] total=2. Try 2 again', path: [2], highlights: [0] },
          { desc: '[2,2] total=4. Try 2 again', path: [2, 2], highlights: [0] },
          { desc: '[2,2,2] total=6. Try 2 → total=8>7, backtrack', path: [2, 2, 2], highlights: [0] },
          { desc: '[2,2,3] total=7 == 7 → FOUND! Add to results ✓', path: [2, 2, 3], highlights: [0, 1], found: true },
          { desc: 'Backtrack, try [7] total=7 == 7 → FOUND! ✓', path: [7], highlights: [3], found: true },
        ],
      },
    ],
  },

  78: {
    visualType: 'backtrack',
    example: { input: [1, 2, 3] },
    approaches: [
      {
        name: 'Backtracking (DFS)',
        complexity: { time: 'O(n·2^n)', space: 'O(n)' },
        code: `result = []; subset = []
def dfs(i):
    if i == len(nums): result.append(subset[:])
    else:
        subset.append(nums[i]); dfs(i+1)
        subset.pop(); dfs(i+1)`,
        steps: [
          { desc: 'i=0: include 1. Path=[1]', path: [1], highlights: [0] },
          { desc: 'i=1: include 2. Path=[1,2]', path: [1, 2], highlights: [1] },
          { desc: 'i=2: include 3. Leaf → add [1,2,3]', path: [1, 2, 3], highlights: [2], found: true },
          { desc: 'i=2: exclude 3. Leaf → add [1,2]', path: [1, 2], highlights: [], found: true },
          { desc: 'Backtrack: i=1 exclude 2. i=2 include 3 → add [1,3]', path: [1, 3], highlights: [2], found: true },
          { desc: 'All 8 subsets found: [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3] ✓', path: [], highlights: [] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// GREEDY & INTERVALS
// ──────────────────────────────────────────────
const greedy = {
  55: {
    visualType: 'array',
    example: { input: [2, 3, 1, 1, 4] },
    approaches: [
      {
        name: 'Greedy (Max Reach)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: `maxReach = 0
for i in range(len(nums)):
    if i > maxReach: return False
    maxReach = max(maxReach, i + nums[i])
return True`,
        steps: [
          { desc: 'i=0: maxReach=max(0,0+2)=2', highlights: [0], pointers: { i: 0 } },
          { desc: 'i=1: 1≤2 OK. maxReach=max(2,1+3)=4', highlights: [1], pointers: { i: 1 } },
          { desc: 'i=2: 2≤4 OK. maxReach=max(4,2+1)=4', highlights: [2], pointers: { i: 2 } },
          { desc: 'i=3: 3≤4 OK. maxReach=max(4,3+1)=4', highlights: [3], pointers: { i: 3 } },
          { desc: 'i=4: 4≤4 OK. Last index reachable → True ✓', highlights: [4], pointers: { i: 4 }, found: [4] },
        ],
      },
    ],
  },

  56: {
    visualType: 'array',
    example: { input: [[1,3],[2,6],[8,10],[15,18]] },
    approaches: [
      {
        name: 'Sort + Greedy Merge',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        code: `intervals.sort(key=lambda x: x[0])
merged = [intervals[0]]
for start, end in intervals[1:]:
    if start <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], end)
    else:
        merged.append([start, end])`,
        steps: [
          { desc: 'Sort by start: [[1,3],[2,6],[8,10],[15,18]]. merged=[[1,3]]', highlights: [0], pointers: {} },
          { desc: '[2,6]: 2≤3 → merge → merged=[[1,6]]', highlights: [0, 1], pointers: {} },
          { desc: '[8,10]: 8>6 → no merge. merged=[[1,6],[8,10]]', highlights: [2], pointers: {} },
          { desc: '[15,18]: 15>10 → no merge. merged=[[1,6],[8,10],[15,18]] ✓', highlights: [3], pointers: {} },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// HEAP / PRIORITY QUEUE
// ──────────────────────────────────────────────
const heap = {
  215: {
    visualType: 'array',
    example: { input: [3, 2, 1, 5, 6, 4], k: 2 },
    approaches: [
      {
        name: 'Min-Heap of size k',
        complexity: { time: 'O(n log k)', space: 'O(k)' },
        code: `import heapq
heap = []
for num in nums:
    heapq.heappush(heap, num)
    if len(heap) > k:
        heapq.heappop(heap)
return heap[0]`,
        steps: [
          { desc: 'Push 3,2,1,5,6,4 one by one. Maintain k=2 sized min-heap', highlights: [0, 1, 2, 3, 4, 5], pointers: {} },
          { desc: 'After push all: heap=[5,6] (two largest)', highlights: [3, 4], pointers: {} },
          { desc: 'heap[0] (min of heap) = 5 = 2nd largest ✓', highlights: [3], pointers: {}, found: [3] },
        ],
      },
      {
        name: 'QuickSelect (Average O(n))',
        complexity: { time: 'O(n) avg', space: 'O(1)' },
        code: `def quickSelect(l, r):
    pivot, p = nums[r], l
    for i in range(l, r):
        if nums[i] <= pivot: nums[p], nums[i] = nums[i], nums[p]; p += 1
    nums[p], nums[r] = nums[r], nums[p]
    if p == k: return nums[p]
    elif k < p: return quickSelect(l, p-1)
    else: return quickSelect(p+1, r)`,
        steps: [
          { desc: 'Partition around pivot. Find kth largest position', highlights: [], pointers: {} },
          { desc: 'QuickSelect narrows down to position n-k', highlights: [3], pointers: {} },
          { desc: 'Return nums[n-k] = 5 ✓', highlights: [3], pointers: {}, found: [3] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// BIT MANIPULATION
// ──────────────────────────────────────────────
const bitManip = {
  191: {
    visualType: 'array',
    example: { input: 11 },
    approaches: [
      {
        name: 'Brian Kernighan Algorithm',
        complexity: { time: 'O(k)', space: 'O(1)' },
        code: `count = 0
while n:
    n &= n - 1  # remove lowest set bit
    count += 1
return count`,
        steps: [
          { desc: 'n=11=1011b. count=0', highlights: [], pointers: {} },
          { desc: 'n &= n-1 → 1011 & 1010 = 1010=10. count=1', highlights: [], pointers: {} },
          { desc: 'n &= n-1 → 1010 & 1001 = 1000=8. count=2', highlights: [], pointers: {} },
          { desc: 'n &= n-1 → 1000 & 0111 = 0000=0. count=3. Done ✓', highlights: [], pointers: {} },
        ],
      },
    ],
  },

  338: {
    visualType: 'dp',
    example: { input: 5 },
    approaches: [
      {
        name: 'DP with Bit Trick',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: `dp = [0] * (n + 1)
for i in range(1, n+1):
    dp[i] = dp[i >> 1] + (i & 1)
return dp`,
        steps: [
          { desc: 'dp[0]=0 (0b0)', dpArr: [0, 0, 0, 0, 0, 0], highlighted: [0] },
          { desc: 'dp[1]=dp[0]+1=1 (0b1)', dpArr: [0, 1, 0, 0, 0, 0], highlighted: [1] },
          { desc: 'dp[2]=dp[1]+0=1 (0b10)', dpArr: [0, 1, 1, 0, 0, 0], highlighted: [2] },
          { desc: 'dp[3]=dp[1]+1=2 (0b11)', dpArr: [0, 1, 1, 2, 0, 0], highlighted: [3] },
          { desc: 'dp[4]=dp[2]+0=1 (0b100)', dpArr: [0, 1, 1, 2, 1, 0], highlighted: [4] },
          { desc: 'dp[5]=dp[2]+1=2 (0b101). Answer=[0,1,1,2,1,2] ✓', dpArr: [0, 1, 1, 2, 1, 2], highlighted: [5] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// MATH & GEOMETRY
// ──────────────────────────────────────────────
const math = {
  48: {
    visualType: 'matrix',
    example: { grid: [[1,2,3],[4,5,6],[7,8,9]] },
    approaches: [
      {
        name: 'Transpose + Reverse',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        code: `# Step 1: Transpose
for i in range(n):
    for j in range(i+1, n):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
# Step 2: Reverse each row
for row in matrix:
    row.reverse()`,
        steps: [
          { desc: 'Original: [[1,2,3],[4,5,6],[7,8,9]]', dpGrid: [[1,2,3],[4,5,6],[7,8,9]], highlighted: [] },
          { desc: 'Transpose (flip diagonal): [[1,4,7],[2,5,8],[3,6,9]]', dpGrid: [[1,4,7],[2,5,8],[3,6,9]], highlighted: [[0,0],[1,1],[2,2]] },
          { desc: 'Reverse each row: [[7,4,1],[8,5,2],[9,6,3]] ✓', dpGrid: [[7,4,1],[8,5,2],[9,6,3]], highlighted: [] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// TRIES
// ──────────────────────────────────────────────
const tries = {
  208: {
    visualType: 'tree',
    example: { input: 'insert("apple"), search("apple"), search("app"), startsWith("app")' },
    approaches: [
      {
        name: 'Trie Node Array',
        complexity: { time: 'O(m) per op', space: 'O(m·n)' },
        code: `class TrieNode:
    def __init__(self): self.children={}; self.end=False
def insert(word):
    cur = self.root
    for c in word: cur=cur.children.setdefault(c,TrieNode()); cur.end=True
def search(word):
    cur = self.root
    for c in word:
        if c not in cur.children: return False
        cur = cur.children[c]
    return cur.end`,
        steps: [
          { desc: 'insert("apple"): a→p→p→l→e[end]', traversalOrder: ['a','p','p','l','e'], currentNode: 'e' },
          { desc: 'search("apple"): traverse a→p→p→l→e. end=True ✓', traversalOrder: ['a','p','p','l','e'], currentNode: 'e' },
          { desc: 'search("app"): traverse a→p→p. end=False → not found', traversalOrder: ['a','p','p'], currentNode: 'p' },
          { desc: 'startsWith("app"): traverse a→p→p. exists → True ✓', traversalOrder: ['a','p','p'], currentNode: 'p' },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// UNION FIND
// ──────────────────────────────────────────────
const unionFind = {
  547: {
    visualType: 'graph',
    example: { nodes: [0,1,2,3], edges: [[0,1],[1,2]] },
    approaches: [
      {
        name: 'Union Find (DSU)',
        complexity: { time: 'O(n² α(n))', space: 'O(n)' },
        code: `parent = list(range(n)); rank=[1]*n
def find(x): 
    while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]
    return x
def union(x,y):
    px,py=find(x),find(y)
    if px==py: return False
    if rank[px]<rank[py]: px,py=py,px
    parent[py]=px; rank[px]+=rank[py]; return True`,
        steps: [
          { desc: 'parent=[0,1,2,3]. Each node is its own component', highlightedNodes: [0,1,2,3], highlightedEdges: [] },
          { desc: 'union(0,1): find(0)=0, find(1)=1. parent[1]=0. 3 components', highlightedNodes: [0,1], highlightedEdges: [[0,1]] },
          { desc: 'union(1,2): find(1)=0, find(2)=2. parent[2]=0. 2 components', highlightedNodes: [0,1,2], highlightedEdges: [[0,1],[0,2]] },
          { desc: 'Count roots with parent[i]==i: {0,3} → 2 provinces ✓', highlightedNodes: [0,3], highlightedEdges: [] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// SORTING & SEARCHING
// ──────────────────────────────────────────────
const sorting = {
  912: {
    visualType: 'array',
    example: { input: [5, 2, 3, 1, 4] },
    approaches: [
      {
        name: 'Merge Sort',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        code: `def mergeSort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr)//2
    L = mergeSort(arr[:mid]); R = mergeSort(arr[mid:])
    return merge(L, R)`,
        steps: [
          { desc: 'Split [5,2,3,1,4] → [5,2] and [3,1,4]', highlights: [0,1,2,3,4], pointers: {} },
          { desc: 'Sort [5,2] → [2,5]. Sort [3,1,4] → [1,3,4]', highlights: [0,1], pointers: {} },
          { desc: 'Merge [2,5] and [1,3,4]: compare and place in order', highlights: [0,2], pointers: { L: 0, R: 2 } },
          { desc: 'Merged result: [1,2,3,4,5] ✓', highlights: [0,1,2,3,4], pointers: {}, result: [1,2,3,4,5] },
        ],
      },
      {
        name: 'Quick Sort',
        complexity: { time: 'O(n log n) avg', space: 'O(log n)' },
        code: `def quickSort(arr, l, r):
    if l < r:
        pivot = partition(arr, l, r)
        quickSort(arr, l, pivot-1)
        quickSort(arr, pivot+1, r)`,
        steps: [
          { desc: 'Choose pivot=4 (last). Partition: elements ≤4 left, >4 right', highlights: [4], pointers: { pivot: 4 } },
          { desc: 'After partition: [2,3,1,4,5]. Pivot=4 at index 3', highlights: [3], pointers: { pivot: 3 } },
          { desc: 'Recurse left [2,3,1] and right [5]', highlights: [0,1,2], pointers: {} },
          { desc: 'Final sorted: [1,2,3,4,5] ✓', highlights: [0,1,2,3,4], pointers: {}, result: [1,2,3,4,5] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// GENERATE DEFAULTS FOR UNREGISTERED QUESTIONS
// ──────────────────────────────────────────────
// Map topics → visual types + default approaches
const topicDefaults = {
  'Arrays & Hashing': { visualType: 'array', approach: 'HashMap' },
  'Two Pointers': { visualType: 'array', approach: 'Two Pointers' },
  'Sliding Window': { visualType: 'array', approach: 'Sliding Window' },
  'Stack': { visualType: 'stack', approach: 'Stack' },
  'Binary Search': { visualType: 'array', approach: 'Binary Search' },
  'Linked List': { visualType: 'linkedlist', approach: 'Two Pointers' },
  'Trees': { visualType: 'tree', approach: 'DFS' },
  'Tries': { visualType: 'tree', approach: 'Trie Traversal' },
  'Heap / Priority Queue': { visualType: 'array', approach: 'Heap' },
  'Backtracking': { visualType: 'backtrack', approach: 'Backtracking' },
  'Graphs': { visualType: 'graph', approach: 'BFS/DFS' },
  'Advanced Graphs': { visualType: 'graph', approach: 'Dijkstra/BFS' },
  '1-D DP': { visualType: 'dp', approach: 'Bottom-Up DP' },
  '2-D DP': { visualType: 'dp2d', approach: '2D DP Table' },
  'Greedy': { visualType: 'array', approach: 'Greedy' },
  'Intervals': { visualType: 'array', approach: 'Sort + Merge' },
  'Math & Geometry': { visualType: 'array', approach: 'Math' },
  'Bit Manipulation': { visualType: 'array', approach: 'Bit Tricks' },
  'Design': { visualType: 'stack', approach: 'Data Structure' },
  'Matrix': { visualType: 'matrix', approach: 'DFS/BFS' },
  'Strings': { visualType: 'array', approach: 'Two Pointers' },
  'Union Find': { visualType: 'graph', approach: 'Union Find' },
  'Advanced Data Structures': { visualType: 'tree', approach: 'Custom DS' },
  'Prefix Sum & Simulation': { visualType: 'dp', approach: 'Prefix Sum' },
  'Recursion & Divide-Conquer': { visualType: 'tree', approach: 'Divide & Conquer' },
  'Sorting & Searching': { visualType: 'array', approach: 'Comparison Sort' },
  'String Matching': { visualType: 'array', approach: 'Sliding Window' },
  'Simulation & Design Games': { visualType: 'matrix', approach: 'Simulation' },
  'Extra Trees & BST Practice': { visualType: 'tree', approach: 'BST Traversal' },
  'Extra Arrays & Hashing Practice': { visualType: 'array', approach: 'HashMap' },
  'Extra Graphs Practice': { visualType: 'graph', approach: 'DFS/BFS' },
  'Extra DP Practice': { visualType: 'dp', approach: 'DP Optimization' },
  'Stock Buy-Sell Family': { visualType: 'array', approach: 'Sliding Window' },
  'Number Theory': { visualType: 'array', approach: 'Math' },
  'Backtracking Extra': { visualType: 'backtrack', approach: 'Backtracking' },
  'Two Pointers Extra': { visualType: 'array', approach: 'Two Pointers' },
  'Sliding Window Extra': { visualType: 'array', approach: 'Sliding Window' },
  'Segment Tree / BIT': { visualType: 'tree', approach: 'Segment Tree' },
  'Company Favorites (Mixed)': { visualType: 'array', approach: 'Optimal' },
  'Final Practice Set': { visualType: 'array', approach: 'Optimal' },
};

/**
 * Generate a default solution entry for any question not specifically registered.
 * Uses topic-based templates with sensible approach descriptions.
 */
export function getDefaultSolution(question) {
  const def = topicDefaults[question.topic] || { visualType: 'array', approach: 'Optimal' };
  return {
    visualType: def.visualType,
    example: { input: [3, 1, 4, 1, 5, 9] },
    approaches: [
      {
        name: 'Brute Force',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        code: `# Brute Force: Check all possibilities
# Time: O(n²) - nested iteration
for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        # check condition
        pass`,
        steps: [
          { desc: `Problem: ${question.title}. Start with brute force approach.`, highlights: [0], pointers: { i: 0 } },
          { desc: 'Iterate through all pairs or elements checking the condition', highlights: [0, 1], pointers: { i: 0, j: 1 } },
          { desc: 'Found the answer by exhaustive search', highlights: [0, 1, 2], pointers: {}, found: [0] },
        ],
      },
      {
        name: def.approach + ' (Optimal)',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        code: `# Optimal: ${def.approach}
# Topic: ${question.topic}
# Time complexity improved significantly

# Key insight: use ${def.approach} pattern
# to avoid redundant computation`,
        steps: [
          { desc: `Use ${def.approach} pattern for "${question.title}"`, highlights: [0], pointers: {} },
          { desc: 'Process elements efficiently without redundant work', highlights: [0, 1, 2], pointers: { i: 0 } },
          { desc: 'Optimal solution found with better time complexity ✓', highlights: [], pointers: {}, found: [0, 1] },
        ],
      },
    ],
  };
}

// ──────────────────────────────────────────────
// MASTER REGISTRY — merge all topic registries
// ──────────────────────────────────────────────
const solutionsRegistry = {
  ...arraysHashing,
  ...twoPointers,
  ...slidingWindow,
  ...binarySearch,
  ...stack,
  ...linkedList,
  ...trees,
  ...graphs,
  ...dp1D,
  ...dp2D,
  ...backtracking,
  ...greedy,
  ...heap,
  ...bitManip,
  ...math,
  ...tries,
  ...unionFind,
  ...sorting,
};

/**
 * Get solution data for a question.
 * Falls back to topic-based template if no specific entry exists.
 */
export function getSolution(question) {
  return solutionsRegistry[question.id] || getDefaultSolution(question);
}

export default solutionsRegistry;
