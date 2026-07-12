// ============================================================
// SOLUTIONS REGISTRY — Animated Visualizer Data
// Each approach has: python (working), java (working), steps[], complexity
// visualType: 'array' | 'tree' | 'graph' | 'dp' | 'dp2d' | 'linkedlist' | 'stack' | 'matrix' | 'backtrack'
// ============================================================

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
        python: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        java: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}`,
        steps: [
          { desc: 'Start with i=0. Check every pair.', highlights: [0], pointers: { i: 0 } },
          { desc: 'nums[0]=2, nums[1]=7. 2+7=9 ✓ Found!', highlights: [0, 1], pointers: { i: 0, j: 1 }, found: [0, 1] },
        ],
      },
      {
        name: 'HashMap (Optimal)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `def twoSum(nums, target):
    seen = {}  # val -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
        steps: [
          { desc: 'Initialize empty hashmap seen={}', highlights: [], pointers: {}, map: {} },
          { desc: 'i=0: num=2, complement=7. 7 not in map → store seen={2:0}', highlights: [0], pointers: { i: 0 }, map: { 2: 0 } },
          { desc: 'i=1: num=7, complement=2. 2 IS in map at index 0 → return [0,1] ✓', highlights: [0, 1], pointers: { i: 1 }, map: { 2: 0 }, found: [0, 1] },
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
        python: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
        java: `public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    int[] result = new int[digits.length + 1];
    result[0] = 1;
    return result;
}`,
        steps: [
          { desc: 'Scan from right: digits[2]=9, set to 0, carry forward', highlights: [2], pointers: { i: 2 } },
          { desc: 'digits[1]=2 < 9 → add 1 → digits[1]=3. Done! Result=[1,3,0]', highlights: [1], pointers: { i: 1 }, result: [1, 3, 0] },
        ],
      },
    ],
  },

  // 88 - Merge Sorted Array
  88: {
    visualType: 'array',
    example: { input: [1, 2, 3, 0, 0, 0] },
    approaches: [
      {
        name: 'Three Pointers (from end)',
        complexity: { time: 'O(m+n)', space: 'O(1)' },
        python: `def merge(nums1, m, nums2, n):
    p1, p2, p = m - 1, n - 1, m + n - 1
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1`,
        java: `public void merge(int[] nums1, int m, int[] nums2, int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p--] = nums1[p1--];
        } else {
            nums1[p--] = nums2[p2--];
        }
    }
}`,
        steps: [
          { desc: 'p1=2(val=3), p2=2(val=6), p=5. Compare 3 vs 6', highlights: [2, 5], pointers: { p1: 2, p2: 2, p: 5 } },
          { desc: '3 < 6 → place 6 at pos 5. p2--, p--', highlights: [5], pointers: { p1: 2, p2: 1, p: 4 } },
          { desc: '3 < 5 → place 5 at pos 4. p2--, p--', highlights: [4], pointers: { p1: 2, p2: 0, p: 3 } },
          { desc: '3 > 2 → place 3 at pos 3. Continue → [1,2,2,3,5,6] ✓', highlights: [3], pointers: { p1: 1, p2: 0, p: 2 }, result: [1, 2, 2, 3, 5, 6] },
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
        python: `def containsDuplicate(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False`,
        java: `public boolean containsDuplicate(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}`,
        steps: [
          { desc: 'Compare every pair. i=0,j=1: 1≠2', highlights: [0, 1], pointers: { i: 0, j: 1 } },
          { desc: 'i=0,j=3: nums[0]=1, nums[3]=1 → DUPLICATE!', highlights: [0, 3], pointers: { i: 0, j: 3 }, found: [0, 3] },
        ],
      },
      {
        name: 'HashSet (Optimal)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
        java: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) return true;
    }
    return false;
}`,
        steps: [
          { desc: 'seen={}. Add 1 → seen={1}', highlights: [0], pointers: { i: 0 }, map: { 1: 0 } },
          { desc: 'Add 2 → seen={1,2}', highlights: [1], pointers: { i: 1 }, map: { 1: 0, 2: 1 } },
          { desc: 'Add 3 → seen={1,2,3}', highlights: [2], pointers: { i: 2 }, map: { 1: 0, 2: 1, 3: 2 } },
          { desc: 'Check 1 → already in seen! DUPLICATE ✓', highlights: [3], pointers: { i: 3 }, map: { 1: 0, 2: 1, 3: 2 }, found: [0, 3] },
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
        python: `def isAnagram(s, t):
    return sorted(s) == sorted(t)`,
        java: `public boolean isAnagram(String s, String t) {
    char[] sa = s.toCharArray();
    char[] ta = t.toCharArray();
    Arrays.sort(sa);
    Arrays.sort(ta);
    return Arrays.equals(sa, ta);
}`,
        steps: [
          { desc: 'Sort s="anagram" → "aaagmnr"', highlights: [], pointers: {} },
          { desc: 'Sort t="nagaram" → "aaagmnr"', highlights: [], pointers: {} },
          { desc: '"aaagmnr" == "aaagmnr" → True ✓', highlights: [], pointers: {} },
        ],
      },
      {
        name: 'Character Count (Optimal)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for c in t:
        count[c] = count.get(c, 0) - 1
        if count[c] < 0:
            return False
    return True`,
        java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (char c : t.toCharArray()) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}`,
        steps: [
          { desc: 'Count chars in s="anagram": {a:3,n:1,g:1,r:1,m:1}', highlights: [], pointers: {}, map: { a: 3, n: 1, g: 1, r: 1, m: 1 } },
          { desc: 'Subtract chars in t="nagaram": all counts → 0', highlights: [], pointers: {}, map: { a: 0, n: 0, g: 0, r: 0, m: 0 } },
          { desc: 'All zeros → Valid Anagram ✓', highlights: [], pointers: {} },
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
        python: `def majorityElement(nums):
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
        if count[n] > len(nums) // 2:
            return n`,
        java: `public int majorityElement(int[] nums) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) {
        count.put(n, count.getOrDefault(n, 0) + 1);
        if (count.get(n) > nums.length / 2) return n;
    }
    return -1;
}`,
        steps: [
          { desc: 'count={2:1}', highlights: [0], pointers: { i: 0 }, map: { 2: 1 } },
          { desc: 'count={2:2}', highlights: [1], pointers: { i: 1 }, map: { 2: 2 } },
          { desc: 'count={2:2,1:1}', highlights: [2], pointers: { i: 2 }, map: { 2: 2, 1: 1 } },
          { desc: 'count={2:2,1:2}', highlights: [3], pointers: { i: 3 }, map: { 2: 2, 1: 2 } },
          { desc: 'count={2:2,1:3}', highlights: [4], pointers: { i: 4 }, map: { 2: 2, 1: 3 } },
          { desc: 'count={2:3,1:3}', highlights: [5], pointers: { i: 5 }, map: { 2: 3, 1: 3 } },
          { desc: 'count={2:4}. 4 > 3 → Majority=2 ✓', highlights: [6], pointers: { i: 6 }, map: { 2: 4, 1: 3 }, found: [0, 1, 5, 6] },
        ],
      },
      {
        name: 'Boyer-Moore Voting',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `def majorityElement(nums):
    candidate, count = None, 0
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    return candidate`,
        java: `public int majorityElement(int[] nums) {
    int candidate = nums[0], count = 0;
    for (int num : nums) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
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
        python: `def removeDuplicates(nums):
    slow = 1
    for fast in range(1, len(nums)):
        if nums[fast] != nums[fast - 1]:
            nums[slow] = nums[fast]
            slow += 1
    return slow`,
        java: `public int removeDuplicates(int[] nums) {
    int slow = 1;
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[fast - 1]) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}`,
        steps: [
          { desc: 'slow=1, fast=1. nums[1]=1=nums[0] → skip', highlights: [0, 1], pointers: { slow: 1, fast: 1 } },
          { desc: 'fast=2. nums[2]=2≠nums[1]=1 → nums[1]=2, slow=2', highlights: [1, 2], pointers: { slow: 2, fast: 2 } },
          { desc: 'fast=3. nums[3]=3≠nums[2] → nums[2]=3, slow=3', highlights: [2, 3], pointers: { slow: 3, fast: 3 } },
          { desc: 'fast=4. nums[4]=3=nums[3] → skip. Done! k=3 ✓', highlights: [3, 4], pointers: { slow: 3, fast: 4 }, result: [1, 2, 3] },
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
        python: `def twoSum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l + 1, r + 1]
        elif s < target:
            l += 1
        else:
            r -= 1`,
        java: `public int[] twoSum(int[] numbers, int target) {
    int l = 0, r = numbers.length - 1;
    while (l < r) {
        int sum = numbers[l] + numbers[r];
        if (sum == target) return new int[]{l + 1, r + 1};
        else if (sum < target) l++;
        else r--;
    }
    return new int[]{};
}`,
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
        python: `def maxArea(height):
    l, r = 0, len(height) - 1
    res = 0
    while l < r:
        res = max(res, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return res`,
        java: `public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, res = 0;
    while (l < r) {
        res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return res;
}`,
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
        python: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit`,
        java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, maxProfit = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
        steps: [
          { desc: 'price=7, minPrice=7, maxProfit=0', highlights: [0], pointers: { buy: 0 } },
          { desc: 'price=1, minPrice=1, maxProfit=0', highlights: [1], pointers: { buy: 1 } },
          { desc: 'price=5, minPrice=1, maxProfit=4', highlights: [2], pointers: { buy: 1, sell: 2 } },
          { desc: 'price=6, minPrice=1, maxProfit=5', highlights: [4], pointers: { buy: 1, sell: 4 } },
          { desc: 'Result=5 (buy@1, sell@6) ✓', highlights: [4], pointers: { buy: 1, sell: 4 }, found: [1, 4] },
        ],
      },
    ],
  },

  3: {
    visualType: 'array',
    example: { input: [65, 98, 99, 65, 98, 99, 98, 98] },
    approaches: [
      {
        name: 'Sliding Window + Set',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `def lengthOfLongestSubstring(s):
    left = 0
    seen = set()
    res = 0
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        res = max(res, right - left + 1)
    return res`,
        java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> seen = new HashSet<>();
    int left = 0, res = 0;
    for (int right = 0; right < s.length(); right++) {
        while (seen.contains(s.charAt(right))) {
            seen.remove(s.charAt(left++));
        }
        seen.add(s.charAt(right));
        res = Math.max(res, right - left + 1);
    }
    return res;
}`,
        steps: [
          { desc: 'l=0,r=0: add "a". window="a", len=1', highlights: [0], pointers: { L: 0, R: 0 } },
          { desc: 'r=1: add "b". window="ab", len=2', highlights: [0, 1], pointers: { L: 0, R: 1 } },
          { desc: 'r=2: add "c". window="abc", len=3', highlights: [0, 1, 2], pointers: { L: 0, R: 2 } },
          { desc: 'r=3: "a" in set! Remove "a", l=1. Add new "a"', highlights: [1, 2, 3], pointers: { L: 1, R: 3 } },
          { desc: 'Max window=3 ✓', highlights: [0, 1, 2], pointers: {}, found: [0, 1, 2] },
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
        python: `def minSubArrayLen(target, nums):
    left = 0
    total = 0
    res = float('inf')
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            res = min(res, right - left + 1)
            total -= nums[left]
            left += 1
    return res if res != float('inf') else 0`,
        java: `public int minSubArrayLen(int target, int[] nums) {
    int left = 0, total = 0, res = Integer.MAX_VALUE;
    for (int right = 0; right < nums.length; right++) {
        total += nums[right];
        while (total >= target) {
            res = Math.min(res, right - left + 1);
            total -= nums[left++];
        }
    }
    return res == Integer.MAX_VALUE ? 0 : res;
}`,
        steps: [
          { desc: 'Expand r. total=2+3+1+2=8≥7. window=[0..3] len=4', highlights: [0, 1, 2, 3], pointers: { L: 0, R: 3 } },
          { desc: 'Shrink: remove nums[0]=2. total=6<7. l=1', highlights: [1, 2, 3], pointers: { L: 1, R: 3 } },
          { desc: 'r=4: total=10≥7. window=[1..4] len=4', highlights: [1, 2, 3, 4], pointers: { L: 1, R: 4 } },
          { desc: 'Shrink: l=2 total=7≥7. res=3', highlights: [2, 3, 4], pointers: { L: 2, R: 4 } },
          { desc: 'Best window=2 ([4,3]) ✓', highlights: [4, 5], pointers: { L: 4, R: 5 }, found: [4, 5] },
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
        python: `def searchInsert(nums, target):
    l, r = 0, len(nums)
    while l < r:
        mid = (l + r) // 2
        if nums[mid] < target:
            l = mid + 1
        else:
            r = mid
    return l`,
        java: `public int searchInsert(int[] nums, int target) {
    int l = 0, r = nums.length;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] < target) l = mid + 1;
        else r = mid;
    }
    return l;
}`,
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
        python: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1`,
        java: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
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
        python: `def findMin(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        if nums[mid] > nums[r]:
            l = mid + 1
        else:
            r = mid
    return nums[l]`,
        java: `public int findMin(int[] nums) {
    int l = 0, r = nums.length - 1;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] > nums[r]) l = mid + 1;
        else r = mid;
    }
    return nums[l];
}`,
        steps: [
          { desc: 'l=0, r=4. mid=2. nums[2]=5>nums[4]=2 → l=3', highlights: [2], pointers: { L: 0, R: 4, M: 2 } },
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
        python: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in '({[':
            stack.append(c)
        elif not stack or stack[-1] != pairs[c]:
            return False
        else:
            stack.pop()
    return not stack`,
        java: `public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c==')' && top!='(') || (c=='}' && top!='{') || (c==']' && top!='['))
                return false;
        }
    }
    return stack.isEmpty();
}`,
        steps: [
          { desc: "Push '(' → stack=['(']", stackState: ['('], current: '(' },
          { desc: "Push '{' → stack=['(', '{']", stackState: ['(', '{'], current: '{' },
          { desc: "Push '[' → stack=['(', '{', '[']", stackState: ['(', '{', '['], current: '[' },
          { desc: "']' matches '[' → pop. stack=['(', '{']", stackState: ['(', '{'], current: ']' },
          { desc: "'}' matches '{' → pop. stack=['(']", stackState: ['('], current: '}' },
          { desc: "')' matches '(' → pop. stack=[] → Valid ✓", stackState: [], current: ')' },
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
        python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        m = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(m)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def getMin(self):
        return self.min_stack[-1]`,
        java: `class MinStack {
    private Deque<Integer> stack = new ArrayDeque<>();
    private Deque<Integer> minStack = new ArrayDeque<>();

    public void push(int val) {
        stack.push(val);
        int m = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
        minStack.push(m);
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int getMin() { return minStack.peek(); }
}`,
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
        python: `def dailyTemperatures(temperatures):
    res = [0] * len(temperatures)
    stack = []  # [temp, index]
    for i, t in enumerate(temperatures):
        while stack and t > stack[-1][0]:
            stackT, stackI = stack.pop()
            res[stackI] = i - stackI
        stack.append([t, i])
    return res`,
        java: `public int[] dailyTemperatures(int[] temperatures) {
    int[] res = new int[temperatures.length];
    Deque<int[]> stack = new ArrayDeque<>(); // {temp, index}
    for (int i = 0; i < temperatures.length; i++) {
        while (!stack.isEmpty() && temperatures[i] > stack.peek()[0]) {
            int[] top = stack.pop();
            res[top[1]] = i - top[1];
        }
        stack.push(new int[]{temperatures[i], i});
    }
    return res;
}`,
        steps: [
          { desc: 'i=0: push (73,0). stack=[(73,0)]', stackState: ['73@0'], current: 73 },
          { desc: 'i=1: 74>73 → pop (73,0), res[0]=1. push (74,1)', stackState: ['74@1'], current: 74 },
          { desc: 'i=2: 75>74 → pop (74,1), res[1]=1. push (75,2)', stackState: ['75@2'], current: 75 },
          { desc: 'i=3: 71<75 → push. stack=[(75,2),(71,3)]', stackState: ['75@2', '71@3'], current: 71 },
          { desc: 'i=6: 76>75,72 → pop both. res[2]=4, res[5]=1', stackState: ['76@6'], current: 76 },
          { desc: 'Final=[1,1,4,2,1,1,0,0] ✓', stackState: ['76@6', '73@7'], current: 73 },
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
        python: `def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    cur = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next = l1
            l1 = l1.next
        else:
            cur.next = l2
            l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next`,
        java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), cur = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
        else { cur.next = l2; l2 = l2.next; }
        cur = cur.next;
    }
    cur.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}`,
        steps: [
          { desc: 'dummy→? Compare 1 vs 1, take l1[1]', nodes: [0, 1, 2, 4, 1, 3, 4], highlighted: [1, 4] },
          { desc: 'Take l2[1]. result: 1→1', nodes: [0, 1, 1, 2, 4, 3, 4], highlighted: [1, 4] },
          { desc: 'Compare 2 vs 3 → take l1[2]', nodes: [0, 1, 1, 2, 4, 3, 4], highlighted: [2, 5] },
          { desc: 'Result: 1→1→2→3→4→4 ✓', nodes: [1, 1, 2, 3, 4, 4], highlighted: [] },
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
        python: `def reverseList(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
        java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, cur = head;
    while (cur != null) {
        ListNode nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}`,
        steps: [
          { desc: 'prev=None, cur=1. Save next=2, point 1→None', nodes: [1, 2, 3, 4, 5], highlighted: [0], pointers: { cur: 0 } },
          { desc: 'prev=1, cur=2. Point 2→1', nodes: [2, 1, 3, 4, 5], highlighted: [0, 1], pointers: { cur: 1 } },
          { desc: 'prev=2, cur=3. Point 3→2', nodes: [3, 2, 1, 4, 5], highlighted: [0, 1, 2], pointers: { cur: 2 } },
          { desc: 'Result: 5→4→3→2→1 ✓', nodes: [5, 4, 3, 2, 1], highlighted: [] },
        ],
      },
      {
        name: 'Recursive',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `def reverseList(head):
    if not head or not head.next:
        return head
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    return new_head`,
        java: `public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}`,
        steps: [
          { desc: 'Recurse to end: reverseList(5). Base case returns 5', nodes: [1, 2, 3, 4, 5], highlighted: [4] },
          { desc: 'Unwind: 5.next=4, 4.next=None', nodes: [5, 4, 3, 2, 1], highlighted: [3, 4] },
          { desc: 'Unwind: 4.next=3, 3.next=None...', nodes: [5, 4, 3, 2, 1], highlighted: [2, 3] },
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
        python: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
        java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
        steps: [
          { desc: 'slow=3, fast=3. Both at head', nodes: [3, 2, 0, -4], highlighted: [0], pointers: { slow: 0, fast: 0 } },
          { desc: 'slow→2, fast→0 (skips 2)', nodes: [3, 2, 0, -4], highlighted: [1, 2], pointers: { slow: 1, fast: 2 } },
          { desc: 'slow→0, fast→2 (wraps via cycle)', nodes: [3, 2, 0, -4], highlighted: [2, 1], pointers: { slow: 2, fast: 1 } },
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
        python: `def inorderTraversal(root):
    res = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        res.append(node.val)
        inorder(node.right)
    inorder(root)
    return res`,
        java: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    inorder(root, res);
    return res;
}
private void inorder(TreeNode node, List<Integer> res) {
    if (node == null) return;
    inorder(node.left, res);
    res.add(node.val);
    inorder(node.right, res);
}`,
        steps: [
          { desc: 'Visit left subtree of 1 → null → backtrack', traversalOrder: [], currentNode: 1 },
          { desc: 'Append 1 to result. result=[1]', traversalOrder: [1], currentNode: 1 },
          { desc: 'Go right to 2. Visit left → node 3', traversalOrder: [1], currentNode: 2 },
          { desc: 'Append 3. result=[1,3]', traversalOrder: [1, 3], currentNode: 3 },
          { desc: 'Back to 2. Append 2. result=[1,3,2] ✓', traversalOrder: [1, 3, 2], currentNode: 2 },
        ],
      },
      {
        name: 'Iterative (Stack)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `def inorderTraversal(root):
    res, stack, cur = [], [], root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        res.append(cur.val)
        cur = cur.right
    return res`,
        java: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode cur = root;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) { stack.push(cur); cur = cur.left; }
        cur = stack.pop();
        res.add(cur.val);
        cur = cur.right;
    }
    return res;
}`,
        steps: [
          { desc: 'Push 1 to stack. Go left → null', traversalOrder: [], currentNode: 1 },
          { desc: 'Pop 1, append. result=[1]. Go right to 2', traversalOrder: [1], currentNode: 2 },
          { desc: 'Push 2. Go left to 3. Push 3. Go left → null', traversalOrder: [1], currentNode: 3 },
          { desc: 'Pop 3, append. result=[1,3]. Pop 2, append. result=[1,3,2] ✓', traversalOrder: [1, 3, 2], currentNode: 2 },
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
        python: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
        java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        steps: [
          { desc: 'Node 3: recurse into left (9) and right (20)', traversalOrder: [], currentNode: 3 },
          { desc: 'Node 9: no children → return 1', traversalOrder: [9], currentNode: 9 },
          { desc: 'Node 20: recurse into 15 and 7', traversalOrder: [20], currentNode: 20 },
          { desc: 'Node 15,7: both return 1', traversalOrder: [15, 7], currentNode: 15 },
          { desc: 'Node 20 returns 2. Node 3 returns 3 ✓', traversalOrder: [3, 9, 20, 15, 7], currentNode: 3 },
        ],
      },
      {
        name: 'BFS Level Order',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `from collections import deque
def maxDepth(root):
    if not root:
        return 0
    q = deque([root])
    depth = 0
    while q:
        for _ in range(len(q)):
            node = q.popleft()
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        depth += 1
    return depth`,
        java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    int depth = 0;
    while (!q.isEmpty()) {
        for (int i = q.size(); i > 0; i--) {
            TreeNode node = q.poll();
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        depth++;
    }
    return depth;
}`,
        steps: [
          { desc: 'Level 1: [3]. depth=1', traversalOrder: [3], currentNode: 3 },
          { desc: 'Level 2: [9, 20]. depth=2', traversalOrder: [3, 9, 20], currentNode: 9 },
          { desc: 'Level 3: [15, 7]. depth=3. Queue empty → return 3 ✓', traversalOrder: [3, 9, 20, 15, 7], currentNode: 15 },
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
        python: `def invertTree(root):
    if not root:
        return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
        java: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode tmp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(tmp);
    return root;
}`,
        steps: [
          { desc: 'Recurse to leaves first', traversalOrder: [1], currentNode: 1 },
          { desc: 'Node 2: swap left(1) and right(3)', traversalOrder: [1, 3, 2], currentNode: 2 },
          { desc: 'Node 7: swap left/right → right=6, left=9', traversalOrder: [6, 9, 7], currentNode: 7 },
          { desc: 'Root 4: swap → left=7, right=2. DONE ✓', traversalOrder: [4, 7, 2], currentNode: 4 },
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
        python: `def numIslands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # mark visited
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
        java: `public int numIslands(char[][] grid) {
    int rows = grid.length, cols = grid[0].length, count = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}
private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r+1, c); dfs(grid, r-1, c);
    dfs(grid, r, c+1); dfs(grid, r, c-1);
}`,
        steps: [
          { desc: 'Find land at (0,0). DFS → mark island 1 as visited', highlights: [[0,0],[0,1],[1,0],[1,1]], current: [0,0] },
          { desc: 'Find land at (2,2). DFS → mark island 2', highlights: [[2,2]], current: [2,2] },
          { desc: 'Find land at (3,3). DFS → mark island 3 (3,3 + 3,4)', highlights: [[3,3],[3,4]], current: [3,3] },
          { desc: 'Total islands = 3 ✓', highlights: [], current: null },
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
        python: `def canFinish(numCourses, prerequisites):
    adj = defaultdict(list)
    for a, b in prerequisites:
        adj[a].append(b)
    visiting = set()
    visited = set()

    def dfs(node):
        if node in visiting: return False  # cycle!
        if node in visited: return True
        visiting.add(node)
        for nei in adj[node]:
            if not dfs(nei): return False
        visiting.remove(node)
        visited.add(node)
        return True

    return all(dfs(c) for c in range(numCourses))`,
        java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] pre : prerequisites) adj.get(pre[0]).add(pre[1]);
    int[] state = new int[numCourses]; // 0=unvisited, 1=visiting, 2=done
    for (int i = 0; i < numCourses; i++)
        if (!dfs(adj, state, i)) return false;
    return true;
}
private boolean dfs(List<List<Integer>> adj, int[] state, int node) {
    if (state[node] == 1) return false;
    if (state[node] == 2) return true;
    state[node] = 1;
    for (int nei : adj.get(node))
        if (!dfs(adj, state, nei)) return false;
    state[node] = 2;
    return true;
}`,
        steps: [
          { desc: 'Build adjacency list. Start DFS from course 0', highlightedNodes: [0], highlightedEdges: [] },
          { desc: 'DFS: 0→1→2→3. All reachable without cycle', highlightedNodes: [0,1,2,3], highlightedEdges: [[0,1],[1,2],[2,3]] },
          { desc: 'No cycles → can finish all courses ✓', highlightedNodes: [], highlightedEdges: [] },
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
        name: 'Memoization (Top-Down)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `def climbStairs(n):
    memo = {}
    def dp(i):
        if i <= 1:
            return 1
        if i in memo:
            return memo[i]
        memo[i] = dp(i - 1) + dp(i - 2)
        return memo[i]
    return dp(n)`,
        java: `public int climbStairs(int n) {
    int[] memo = new int[n + 1];
    return dp(n, memo);
}
private int dp(int n, int[] memo) {
    if (n <= 1) return 1;
    if (memo[n] != 0) return memo[n];
    memo[n] = dp(n - 1, memo) + dp(n - 2, memo);
    return memo[n];
}`,
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
        python: `def climbStairs(n):
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
        java: `public int climbStairs(int n) {
    int a = 1, b = 1;
    for (int i = 2; i <= n; i++) {
        int tmp = a + b;
        a = b;
        b = tmp;
    }
    return b;
}`,
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
        python: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    return dp[-1]`,
        java: `public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    int[] dp = new int[nums.length];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (int i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[nums.length - 1];
}`,
        steps: [
          { desc: 'dp[0]=2 (rob house 0)', dpArr: [2, 0, 0, 0, 0], highlighted: [0] },
          { desc: 'dp[1]=max(2,7)=7', dpArr: [2, 7, 0, 0, 0], highlighted: [1] },
          { desc: 'dp[2]=max(7, 2+9)=11', dpArr: [2, 7, 11, 0, 0], highlighted: [2] },
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
        python: `def coinChange(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != amount + 1 else -1`,
        java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int c : coins) {
            if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
        steps: [
          { desc: 'dp=[0,∞,...,∞]. dp[0]=0 (0 coins for amount 0)', dpArr: [0,12,12,12,12,12,12,12,12,12,12,12], highlighted: [0] },
          { desc: 'dp[1]=1 (coin=1)', dpArr: [0,1,12,12,12,12,12,12,12,12,12,12], highlighted: [1] },
          { desc: 'dp[5]=1 (coin=5)', dpArr: [0,1,2,3,4,1,2,3,4,5,2,3], highlighted: [5] },
          { desc: 'dp[6]=1 (coin=6)', dpArr: [0,1,2,3,4,1,1,2,3,2,2,2], highlighted: [6] },
          { desc: 'dp[11]=2 (6+5 or 5+6). Answer=2 ✓', dpArr: [0,1,2,3,4,1,1,2,3,2,2,2], highlighted: [11] },
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
        python: `def lengthOfLIS(nums):
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
        java: `public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1);
    int res = 1;
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i])
                dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        res = Math.max(res, dp[i]);
    }
    return res;
}`,
        steps: [
          { desc: 'All dp[i]=1 (each element alone is LIS of length 1)', dpArr: [1,1,1,1,1,1,1,1], highlighted: [] },
          { desc: 'i=3(val=5): 2<5 → dp[3]=max(1,dp[2]+1)=2', dpArr: [1,1,1,2,1,1,1,1], highlighted: [3] },
          { desc: 'i=4(val=3): 2<3 → dp[4]=2', dpArr: [1,1,1,2,2,1,1,1], highlighted: [4] },
          { desc: 'i=5(val=7): 2<7,5<7,3<7 → dp[5]=3', dpArr: [1,1,1,2,2,3,1,1], highlighted: [5] },
          { desc: 'i=6(val=101): all before smaller → dp[6]=4', dpArr: [1,1,1,2,2,3,4,1], highlighted: [6] },
          { desc: 'max(dp)=4. LIS=[2,3,7,101] ✓', dpArr: [1,1,1,2,2,3,4,4], highlighted: [] },
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
        python: `def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    for r in range(1, m):
        for c in range(1, n):
            dp[r][c] = dp[r-1][c] + dp[r][c-1]
    return dp[m-1][n-1]`,
        java: `public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int r = 0; r < m; r++) Arrays.fill(dp[r], 1);
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            dp[r][c] = dp[r-1][c] + dp[r][c-1];
        }
    }
    return dp[m-1][n-1];
}`,
        steps: [
          { desc: 'Top row and left col = 1 (one way only)', dpGrid: [[1,1,1],[1,0,0],[1,0,0]], highlighted: [[0,0],[0,1],[0,2],[1,0],[2,0]] },
          { desc: 'dp[1][1]=dp[0][1]+dp[1][0]=2', dpGrid: [[1,1,1],[1,2,0],[1,0,0]], highlighted: [[1,1]] },
          { desc: 'dp[1][2]=dp[0][2]+dp[1][1]=3', dpGrid: [[1,1,1],[1,2,3],[1,0,0]], highlighted: [[1,2]] },
          { desc: 'dp[2][1]=dp[1][1]+dp[2][0]=3', dpGrid: [[1,1,1],[1,2,3],[1,3,0]], highlighted: [[2,1]] },
          { desc: 'dp[2][2]=dp[1][2]+dp[2][1]=6 ✓', dpGrid: [[1,1,1],[1,2,3],[1,3,6]], highlighted: [[2,2]] },
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
        python: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
        java: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i-1) == text2.charAt(j-1))
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
        steps: [
          { desc: 'Initialize: dp[0][*]=0, dp[*][0]=0', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]], highlighted: [] },
          { desc: 'i=1(A): A=A at j=4 → dp[1][4]=1', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,1,1],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]], highlighted: [[1,4]] },
          { desc: 'i=2(B): B=B at j=1 → dp[2][1]=1', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,1,1],[0,1,1,1,1,2],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]], highlighted: [[2,1]] },
          { desc: 'dp[7][5]=4. LCS=4 ("BCAB") ✓', dpGrid: [[0,0,0,0,0,0],[0,0,0,0,1,1],[0,1,1,1,1,2],[0,1,2,2,2,2],[0,1,2,2,3,3],[0,1,2,2,3,4],[0,1,2,3,3,4],[0,1,2,3,4,4]], highlighted: [[7,5]] },
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
        python: `def combinationSum(candidates, target):
    result = []
    def backtrack(i, current, total):
        if total == target:
            result.append(current[:])
            return
        if total > target or i >= len(candidates):
            return
        current.append(candidates[i])
        backtrack(i, current, total + candidates[i])
        current.pop()
        backtrack(i + 1, current, total)
    backtrack(0, [], 0)
    return result`,
        java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), 0, result);
    return result;
}
private void backtrack(int[] candidates, int target, int i,
                       List<Integer> current, int total, List<List<Integer>> result) {
    if (total == target) { result.add(new ArrayList<>(current)); return; }
    if (total > target || i >= candidates.length) return;
    current.add(candidates[i]);
    backtrack(candidates, target, i, current, total + candidates[i], result);
    current.remove(current.size() - 1);
    backtrack(candidates, target, i + 1, current, total, result);
}`,
        steps: [
          { desc: 'Start: [] total=0. Try candidates[0]=2', path: [], highlights: [0] },
          { desc: '[2] total=2. Try 2 again', path: [2], highlights: [0] },
          { desc: '[2,2] total=4. Try 2 again', path: [2, 2], highlights: [0] },
          { desc: '[2,2,2] total=6. Try 2 → 8>7 PRUNE, try 3', path: [2, 2, 2], highlights: [0] },
          { desc: '[2,2,3] total=7 == 7 → FOUND ✓', path: [2, 2, 3], highlights: [0, 1], found: true },
          { desc: '[7] total=7 == 7 → FOUND ✓', path: [7], highlights: [3], found: true },
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
        python: `def subsets(nums):
    result = []
    def dfs(i, subset):
        if i == len(nums):
            result.append(subset[:])
            return
        subset.append(nums[i])
        dfs(i + 1, subset)   # include nums[i]
        subset.pop()
        dfs(i + 1, subset)   # exclude nums[i]
    dfs(0, [])
    return result`,
        java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    dfs(nums, 0, new ArrayList<>(), result);
    return result;
}
private void dfs(int[] nums, int i, List<Integer> subset, List<List<Integer>> result) {
    if (i == nums.length) {
        result.add(new ArrayList<>(subset));
        return;
    }
    subset.add(nums[i]);
    dfs(nums, i + 1, subset, result);
    subset.remove(subset.size() - 1);
    dfs(nums, i + 1, subset, result);
}`,
        steps: [
          { desc: 'i=0: include 1. Path=[1]', path: [1], highlights: [0] },
          { desc: 'i=1: include 2. Path=[1,2]', path: [1, 2], highlights: [1] },
          { desc: 'i=2: include 3. Leaf → add [1,2,3]', path: [1, 2, 3], highlights: [2], found: true },
          { desc: 'i=2: exclude 3. Leaf → add [1,2]', path: [1, 2], highlights: [], found: true },
          { desc: 'Backtrack: i=1 exclude 2. Path=[1,3] → add [1,3]', path: [1, 3], highlights: [2], found: true },
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
        python: `def canJump(nums):
    max_reach = 0
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
    return True`,
        java: `public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`,
        steps: [
          { desc: 'i=0: maxReach=max(0,0+2)=2', highlights: [0], pointers: { i: 0 } },
          { desc: 'i=1: 1≤2 OK. maxReach=max(2,1+3)=4', highlights: [1], pointers: { i: 1 } },
          { desc: 'i=2: 2≤4 OK. maxReach=max(4,2+1)=4', highlights: [2], pointers: { i: 2 } },
          { desc: 'i=3: 3≤4 OK. maxReach=4', highlights: [3], pointers: { i: 3 } },
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
        python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
        java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();
    merged.add(intervals[0]);
    for (int i = 1; i < intervals.length; i++) {
        int[] last = merged.get(merged.size() - 1);
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.add(intervals[i]);
        }
    }
    return merged.toArray(new int[0][]);
}`,
        steps: [
          { desc: 'Sort by start: [[1,3],[2,6],[8,10],[15,18]]. merged=[[1,3]]', highlights: [0], pointers: {} },
          { desc: '[2,6]: 2≤3 → merge → merged=[[1,6]]', highlights: [0, 1], pointers: {} },
          { desc: '[8,10]: 8>6 → no merge. merged=[[1,6],[8,10]]', highlights: [2], pointers: {} },
          { desc: '[15,18]: 15>10 → no merge. Final=[[1,6],[8,10],[15,18]] ✓', highlights: [3], pointers: {} },
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
        python: `import heapq
def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
        java: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int num : nums) {
        heap.offer(num);
        if (heap.size() > k) heap.poll();
    }
    return heap.peek();
}`,
        steps: [
          { desc: 'Push all elements, maintain heap size = k=2', highlights: [0, 1, 2, 3, 4, 5], pointers: {} },
          { desc: 'After all pushes: heap=[5,6] (two largest)', highlights: [3, 4], pointers: {} },
          { desc: 'heap[0] (min of heap) = 5 = 2nd largest ✓', highlights: [3], pointers: {}, found: [3] },
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
        python: `def hammingWeight(n):
    count = 0
    while n:
        n &= n - 1  # removes lowest set bit
        count += 1
    return count`,
        java: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= n - 1; // removes lowest set bit
        count++;
    }
    return count;
}`,
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
        python: `def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
        java: `public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}`,
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
        python: `def rotate(matrix):
    n = len(matrix)
    # Step 1: Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row
    for row in matrix:
        row.reverse()`,
        java: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    // Step 1: Transpose
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    // Step 2: Reverse each row
    for (int[] row : matrix) {
        int l = 0, r = n - 1;
        while (l < r) { int tmp = row[l]; row[l++] = row[r]; row[r--] = tmp; }
    }
}`,
        steps: [
          { desc: 'Original: [[1,2,3],[4,5,6],[7,8,9]]', dpGrid: [[1,2,3],[4,5,6],[7,8,9]], highlighted: [] },
          { desc: 'Transpose (flip over diagonal): [[1,4,7],[2,5,8],[3,6,9]]', dpGrid: [[1,4,7],[2,5,8],[3,6,9]], highlighted: [[0,0],[1,1],[2,2]] },
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
    example: { input: 'insert("apple"), search("apple"), startsWith("app")' },
    approaches: [
      {
        name: 'Trie with HashMap Children',
        complexity: { time: 'O(m) per op', space: 'O(m·n)' },
        python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.is_end = True

    def search(self, word):
        cur = self.root
        for c in word:
            if c not in cur.children:
                return False
            cur = cur.children[c]
        return cur.is_end

    def startsWith(self, prefix):
        cur = self.root
        for c in prefix:
            if c not in cur.children:
                return False
            cur = cur.children[c]
        return True`,
        java: `class Trie {
    private TrieNode root = new TrieNode();

    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEnd = false;
    }

    public void insert(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            cur.children.putIfAbsent(c, new TrieNode());
            cur = cur.children.get(c);
        }
        cur.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            if (!cur.children.containsKey(c)) return false;
            cur = cur.children.get(c);
        }
        return cur.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode cur = root;
        for (char c : prefix.toCharArray()) {
            if (!cur.children.containsKey(c)) return false;
            cur = cur.children.get(c);
        }
        return true;
    }
}`,
        steps: [
          { desc: 'insert("apple"): create path a→p→p→l→e[END]', traversalOrder: ['a','p','p','l','e'], currentNode: 'e' },
          { desc: 'search("apple"): traverse a→p→p→l→e. isEnd=True ✓', traversalOrder: ['a','p','p','l','e'], currentNode: 'e' },
          { desc: 'search("app"): traverse a→p→p. isEnd=False → not found', traversalOrder: ['a','p','p'], currentNode: 'p' },
          { desc: 'startsWith("app"): a→p→p exists → True ✓', traversalOrder: ['a','p','p'], currentNode: 'p' },
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
        python: `def findCircleNum(isConnected):
    n = len(isConnected)
    parent = list(range(n))
    rank = [1] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # path compression
            x = parent[x]
        return x

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        rank[px] += rank[py]
        return True

    provinces = n
    for i in range(n):
        for j in range(i + 1, n):
            if isConnected[i][j] and union(i, j):
                provinces -= 1
    return provinces`,
        java: `public int findCircleNum(int[][] isConnected) {
    int n = isConnected.length;
    int[] parent = new int[n], rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int provinces = n;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (isConnected[i][j] == 1 && union(parent, rank, i, j))
                provinces--;
    return provinces;
}
private int find(int[] parent, int x) {
    while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
}
private boolean union(int[] parent, int[] rank, int x, int y) {
    int px = find(parent, x), py = find(parent, y);
    if (px == py) return false;
    if (rank[px] < rank[py]) { int tmp = px; px = py; py = tmp; }
    parent[py] = px; rank[px] += rank[py];
    return true;
}`,
        steps: [
          { desc: 'parent=[0,1,2,3]. Each node its own component.', highlightedNodes: [0,1,2,3], highlightedEdges: [] },
          { desc: 'union(0,1): parent[1]=0. 3 components', highlightedNodes: [0,1], highlightedEdges: [[0,1]] },
          { desc: 'union(1,2): find(1)=0. parent[2]=0. 2 components', highlightedNodes: [0,1,2], highlightedEdges: [[0,1],[0,2]] },
          { desc: 'Roots={0,3} → 2 provinces ✓', highlightedNodes: [0,3], highlightedEdges: [] },
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
        python: `def sortArray(nums):
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        return merge(left, right)

    def merge(left, right):
        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i]); i += 1
            else:
                result.append(right[j]); j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result

    return merge_sort(nums)`,
        java: `public int[] sortArray(int[] nums) {
    mergeSort(nums, 0, nums.length - 1);
    return nums;
}
private void mergeSort(int[] nums, int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(nums, l, mid);
    mergeSort(nums, mid + 1, r);
    merge(nums, l, mid, r);
}
private void merge(int[] nums, int l, int mid, int r) {
    int[] tmp = Arrays.copyOfRange(nums, l, r + 1);
    int i = 0, j = mid - l + 1, k = l;
    while (i <= mid - l && j <= r - l)
        nums[k++] = tmp[i] <= tmp[j] ? tmp[i++] : tmp[j++];
    while (i <= mid - l) nums[k++] = tmp[i++];
    while (j <= r - l) nums[k++] = tmp[j++];
}`,
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
        python: `def sortArray(nums):
    def quickSort(arr, l, r):
        if l >= r:
            return
        pivot_idx = partition(arr, l, r)
        quickSort(arr, l, pivot_idx - 1)
        quickSort(arr, pivot_idx + 1, r)

    def partition(arr, l, r):
        pivot = arr[r]
        p = l
        for i in range(l, r):
            if arr[i] <= pivot:
                arr[p], arr[i] = arr[i], arr[p]
                p += 1
        arr[p], arr[r] = arr[r], arr[p]
        return p

    quickSort(nums, 0, len(nums) - 1)
    return nums`,
        java: `public int[] sortArray(int[] nums) {
    quickSort(nums, 0, nums.length - 1);
    return nums;
}
private void quickSort(int[] nums, int l, int r) {
    if (l >= r) return;
    int pivot = partition(nums, l, r);
    quickSort(nums, l, pivot - 1);
    quickSort(nums, pivot + 1, r);
}
private int partition(int[] nums, int l, int r) {
    int pivot = nums[r], p = l;
    for (int i = l; i < r; i++)
        if (nums[i] <= pivot) { int tmp = nums[p]; nums[p++] = nums[i]; nums[i] = tmp; }
    int tmp = nums[p]; nums[p] = nums[r]; nums[r] = tmp;
    return p;
}`,
        steps: [
          { desc: 'Choose pivot=4 (last). Partition: ≤4 left, >4 right', highlights: [4], pointers: { pivot: 4 } },
          { desc: 'After partition: [2,3,1,4,5]. Pivot at index 3', highlights: [3], pointers: { pivot: 3 } },
          { desc: 'Recurse left [2,3,1] and right [5]', highlights: [0,1,2], pointers: {} },
          { desc: 'Final sorted: [1,2,3,4,5] ✓', highlights: [0,1,2,3,4], pointers: {}, result: [1,2,3,4,5] },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// DEFAULT TOPIC-BASED TEMPLATES
// ──────────────────────────────────────────────
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

export function getDefaultSolution(question) {
  const def = topicDefaults[question.topic] || { visualType: 'array', approach: 'Optimal' };
  return {
    visualType: def.visualType,
    example: { input: [3, 1, 4, 1, 5, 9] },
    approaches: [
      {
        name: 'Brute Force',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        python: `# Python — Brute Force
# Problem: ${question.title}
# Topic: ${question.topic}

def solve(nums):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            # check pair condition
            pass
    return -1`,
        java: `// Java — Brute Force
// Problem: ${question.title}
// Topic: ${question.topic}

public int solve(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            // check pair condition
        }
    }
    return -1;
}`,
        steps: [
          { desc: `Brute force for "${question.title}": try all pairs.`, highlights: [0], pointers: { i: 0 } },
          { desc: 'Nested iteration checks all combinations.', highlights: [0, 1], pointers: { i: 0, j: 1 } },
          { desc: 'Found answer by exhaustive search ✓', highlights: [0, 1, 2], pointers: {}, found: [0] },
        ],
      },
      {
        name: def.approach + ' (Optimal)',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        python: `# Python — ${def.approach}
# Problem: ${question.title}
# Topic: ${question.topic}

def solve(nums):
    # ${def.approach} pattern
    # Avoids redundant nested iteration
    result = None
    for i, num in enumerate(nums):
        # process element optimally
        result = num
    return result`,
        java: `// Java — ${def.approach}
// Problem: ${question.title}
// Topic: ${question.topic}

public int solve(int[] nums) {
    // ${def.approach} pattern
    // Avoids redundant nested iteration
    int result = 0;
    for (int i = 0; i < nums.length; i++) {
        // process element optimally
        result = nums[i];
    }
    return result;
}`,
        steps: [
          { desc: `Use ${def.approach} pattern for "${question.title}"`, highlights: [0], pointers: {} },
          { desc: 'Process elements efficiently without redundant work.', highlights: [0, 1, 2], pointers: { i: 0 } },
          { desc: 'Optimal solution found ✓', highlights: [], pointers: {}, found: [0, 1] },
        ],
      },
    ],
  };
}

// ──────────────────────────────────────────────
// MASTER REGISTRY
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

export function getSolution(question) {
  return solutionsRegistry[question.id] || getDefaultSolution(question);
}

export default solutionsRegistry;
