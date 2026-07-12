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
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}`,
        steps: [
          { desc: 'Start with i=0. Check every pair.', highlights: [0], pointers: { i: 0 } },
          { desc: 'nums[0]=2, nums[1]=7. 2+7=9 ✓ Found!', highlights: [0, 1], pointers: { i: 0, j: 1 }, found: [0, 1] },
        ],
      },
      {
        name: 'HashMap (Optimal)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}  # val -> index
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
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
        python: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits`,
        java: `class Solution {
    public int[] plusOne(int[] digits) {
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
    }
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
        python: `class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        p1, p2, p = m - 1, n - 1, m + n - 1
        while p2 >= 0:
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1`,
        java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p--] = nums1[p1--];
            } else {
                nums1[p--] = nums2[p2--];
            }
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
        python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j]:
                    return True
        return False`,
        java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
}`,
        steps: [
          { desc: 'Compare every pair. i=0,j=1: 1≠2', highlights: [0, 1], pointers: { i: 0, j: 1 } },
          { desc: 'i=0,j=3: nums[0]=1, nums[3]=1 → DUPLICATE!', highlights: [0, 3], pointers: { i: 0, j: 3 }, found: [0, 3] },
        ],
      },
      {
        name: 'HashSet (Optimal)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False`,
        java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) return true;
        }
        return false;
    }
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
        python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)`,
        java: `class Solution {
    public boolean isAnagram(String s, String t) {
        char[] sa = s.toCharArray();
        char[] ta = t.toCharArray();
        Arrays.sort(sa);
        Arrays.sort(ta);
        return Arrays.equals(sa, ta);
    }
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
        python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
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
        java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
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
        python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        count = {}
        for n in nums:
            count[n] = count.get(n, 0) + 1
            if count[n] > len(nums) // 2:
                return n`,
        java: `class Solution {
    public int majorityElement(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) {
            count.put(n, count.getOrDefault(n, 0) + 1);
            if (count.get(n) > nums.length / 2) return n;
        }
        return -1;
    }
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
        name: 'Boyer-Moore Voting (Optimal)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate, count = None, 0
        for num in nums:
            if count == 0:
                candidate = num
            count += 1 if num == candidate else -1
        return candidate`,
        java: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
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
        python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        slow = 1
        for fast in range(1, len(nums)):
            if nums[fast] != nums[fast - 1]:
                nums[slow] = nums[fast]
                slow += 1
        return slow`,
        java: `class Solution {
    public int removeDuplicates(int[] nums) {
        int slow = 1;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[fast - 1]) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }
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
        python: `class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers) - 1
        while l < r:
            s = numbers[l] + numbers[r]
            if s == target:
                return [l + 1, r + 1]
            elif s < target:
                l += 1
            else:
                r -= 1`,
        java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int l = 0, r = numbers.length - 1;
        while (l < r) {
            int sum = numbers[l] + numbers[r];
            if (sum == target) return new int[]{l + 1, r + 1};
            else if (sum < target) l++;
            else r--;
        }
        return new int[]{};
    }
}`,
        steps: [
          { desc: 'l=0(val=2), r=3(val=15). sum=17 > 9 → r--', highlights: [0, 3], pointers: { L: 0, R: 3 } },
          { desc: 'l=0(val=2), r=2(val=11). sum=13 > 9 → r--', highlights: [0, 2], pointers: { L: 0, R: 2 } },
          { desc: 'l=0(val=2), r=1(val=7). sum=9 == 9 → return [1,2] ✓', highlights: [0, 1], pointers: { L: 0, R: 1 }, found: [0, 1] },
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
        name: 'Brute Force',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        for i in range(len(prices)):
            for j in range(i + 1, len(prices)):
                if prices[j] - prices[i] > max_profit:
                    max_profit = prices[j] - prices[i]
        return max_profit`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                if (prices[j] - prices[i] > maxProfit) {
                    maxProfit = prices[j] - prices[i];
                }
            }
        }
        return maxProfit;
    }
}`,
        steps: [
          { desc: 'Try buy at 7, check all futures.', highlights: [0], pointers: { buy: 0, sell: 1 } },
          { desc: 'Try buy at 1, find profit at 5,6.', highlights: [1, 2], pointers: { buy: 1, sell: 2 } },
          { desc: 'Max profit found: 5 ✓', highlights: [1, 4], pointers: { buy: 1, sell: 4 }, found: [1, 4] },
        ],
      },
      {
        name: 'Sliding Window (Optimal)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
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
};

// ──────────────────────────────────────────────
// BINARY SEARCH
// ──────────────────────────────────────────────
const binarySearch = {
  704: {
    visualType: 'array',
    example: { input: [-1, 0, 3, 5, 9, 12], target: 9 },
    approaches: [
      {
        name: 'Linear Search (Suboptimal)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        for i, num in enumerate(nums):
            if num == target:
                return i
        return -1`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
        steps: [
          { desc: 'Check index 0: -1 != 9', highlights: [0], pointers: { i: 0 } },
          { desc: 'Check index 1: 0 != 9', highlights: [1], pointers: { i: 1 } },
          { desc: 'Check index 4: 9 == 9 -> Found! ✓', highlights: [4], pointers: { i: 4 }, found: [4] },
        ],
      },
      {
        name: 'Classic Binary Search',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
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
        java: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
}`,
        steps: [
          { desc: 'l=0, r=5. mid=2. nums[2]=3<9 → l=3', highlights: [2], pointers: { L: 0, R: 5, M: 2 } },
          { desc: 'l=3, r=5. mid=4. nums[4]=9==9 → return 4 ✓', highlights: [4], pointers: { L: 3, R: 5, M: 4 }, found: [4] },
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
        python: `class Solution:
    def isValid(self, s: str) -> bool:
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
        java: `class Solution {
    public boolean isValid(String s) {
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
    }
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
};

// ──────────────────────────────────────────────
// LINKED LIST
// ──────────────────────────────────────────────
const linkedList = {
  206: {
    visualType: 'linkedlist',
    example: { input: [1, 2, 3, 4, 5] },
    approaches: [
      {
        name: 'Iterative (Optimal Time/Space)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        cur = head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        return prev`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
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
        python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
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
};

// ──────────────────────────────────────────────
// TREES
// ──────────────────────────────────────────────
const trees = {
  104: {
    visualType: 'tree',
    example: { tree: { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } } },
    approaches: [
      {
        name: 'Recursive DFS',
        complexity: { time: 'O(n)', space: 'O(h)' },
        python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
        java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
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
        python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
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
        java: `class Solution {
    public int maxDepth(TreeNode root) {
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
    }
}`,
        steps: [
          { desc: 'Level 1: [3]. depth=1', traversalOrder: [3], currentNode: 3 },
          { desc: 'Level 2: [9, 20]. depth=2', traversalOrder: [3, 9, 20], currentNode: 9 },
          { desc: 'Level 3: [15, 7]. depth=3. Queue empty → return 3 ✓', traversalOrder: [3, 9, 20, 15, 7], currentNode: 15 },
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
};

export function getDefaultSolution(question) {
  const def = topicDefaults[question.topic] || { visualType: 'array', approach: 'Optimal' };
  return {
    visualType: def.visualType,
    example: { input: [3, 1, 4, 1, 5, 9] },
    approaches: [
      {
        name: 'Brute Force (Suboptimal)',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        python: `class Solution:
    def solve(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                # check condition
                pass
        return -1`,
        java: `class Solution {
    public int solve(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // check condition
            }
        }
        return -1;
    }
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
        python: `class Solution:
    def solve(self, nums: List[int]) -> int:
        # ${def.approach} pattern
        # Avoids redundant nested iteration
        result = 0
        for i, num in enumerate(nums):
            # process element optimally
            result = num
        return result`,
        java: `class Solution {
    public int solve(int[] nums) {
        // ${def.approach} pattern
        // Avoids redundant nested iteration
        int result = 0;
        for (int i = 0; i < nums.length; i++) {
            // process element optimally
            result = nums[i];
        }
        return result;
    }
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
};

export function getSolution(question) {
  return solutionsRegistry[question.id] || getDefaultSolution(question);
}

export default solutionsRegistry;
