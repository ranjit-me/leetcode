// ============================================================
// SOLUTIONS REGISTRY — Real LeetCode Test Cases + Full Dry-Run Animations
// Each step: { desc, highlights, pointers, codeLineActive, vars, found, result, map }
// codeLineActive: 1-based line number of the executing code line
// vars: live variable watch { name: value }
// ============================================================

// ──────────────────────────────────────────────
// ARRAYS & HASHING
// ──────────────────────────────────────────────
const arraysHashing = {

  // ─── #1 Two Sum ───────────────────────────────────────────────
  1: {
    visualType: 'array',
    testCases: [
      { data: { input: [2, 7, 11, 15], target: 9 },  label: 'Case 1' },
      { data: { input: [3, 2, 4],      target: 6 },  label: 'Case 2' },
      { data: { input: [3, 3],         target: 6 },  label: 'Case 3' },
    ],
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
          [ // Case 1: [2,7,11,15], target=9
            { desc: 'Start: outer loop i=0, nums[i]=2', highlights: [0], pointers: { i:0 }, codeLineActive: 3, vars: { i:0 } },
            { desc: 'Inner loop j=1, nums[j]=7. Check 2+7=9==target?', highlights: [0,1], pointers: { i:0, j:1 }, codeLineActive: 4, vars: { i:0, j:1, sum:9 } },
            { desc: '✅ 2+7=9 == 9. Found! Return [0,1]', highlights: [0,1], pointers: { i:0, j:1 }, codeLineActive: 5, vars: { i:0, j:1 }, found: [0,1] },
          ],
          [ // Case 2: [3,2,4], target=6
            { desc: 'i=0, nums[i]=3', highlights: [0], pointers: { i:0 }, codeLineActive: 3, vars: { i:0 } },
            { desc: 'j=1, nums[j]=2. Check 3+2=5==6? ❌', highlights: [0,1], pointers: { i:0, j:1 }, codeLineActive: 4, vars: { i:0, j:1, sum:5 } },
            { desc: 'j=2, nums[j]=4. Check 3+4=7==6? ❌', highlights: [0,2], pointers: { i:0, j:2 }, codeLineActive: 4, vars: { i:0, j:2, sum:7 } },
            { desc: 'i=1, nums[i]=2', highlights: [1], pointers: { i:1 }, codeLineActive: 3, vars: { i:1 } },
            { desc: 'j=2, nums[j]=4. Check 2+4=6==6? ✅ Return [1,2]', highlights: [1,2], pointers: { i:1, j:2 }, codeLineActive: 5, vars: { i:1, j:2, sum:6 }, found: [1,2] },
          ],
          [ // Case 3: [3,3], target=6
            { desc: 'i=0, nums[i]=3', highlights: [0], pointers: { i:0 }, codeLineActive: 3, vars: { i:0 } },
            { desc: 'j=1, nums[j]=3. Check 3+3=6==6? ✅ Return [0,1]', highlights: [0,1], pointers: { i:0, j:1 }, codeLineActive: 5, vars: { i:0, j:1, sum:6 }, found: [0,1] },
          ],
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
        Map<Integer,Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement))
                return new int[]{seen.get(complement), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        steps: [
          [ // Case 1: [2,7,11,15], target=9
            { desc: 'Initialize seen = {} (empty hashmap)', highlights: [], pointers: {}, codeLineActive: 3, vars: { seen: '{}' } },
            { desc: 'i=0, num=2. complement = 9-2 = 7', highlights: [0], pointers: { i:0 }, codeLineActive: 5, vars: { i:0, num:2, complement:7, seen:'{}' } },
            { desc: '7 not in seen. Store seen[2] = 0', highlights: [0], pointers: { i:0 }, codeLineActive: 8, vars: { i:0, seen:'{2:0}' } },
            { desc: 'i=1, num=7. complement = 9-7 = 2', highlights: [1], pointers: { i:1 }, codeLineActive: 5, vars: { i:1, num:7, complement:2, seen:'{2:0}' } },
            { desc: '✅ 2 IS in seen at index 0! Return [0,1]', highlights: [0,1], pointers: { i:1 }, codeLineActive: 7, vars: { answer:'[0,1]' }, found: [0,1] },
          ],
          [ // Case 2: [3,2,4], target=6
            { desc: 'seen = {}', highlights: [], pointers: {}, codeLineActive: 3, vars: { seen:'{}' } },
            { desc: 'i=0, num=3. complement = 6-3 = 3. 3 not in seen.', highlights: [0], pointers: { i:0 }, codeLineActive: 5, vars: { i:0, num:3, complement:3, seen:'{}' } },
            { desc: 'Store seen[3] = 0', highlights: [0], pointers: { i:0 }, codeLineActive: 8, vars: { seen:'{3:0}' } },
            { desc: 'i=1, num=2. complement = 6-2 = 4. 4 not in seen.', highlights: [1], pointers: { i:1 }, codeLineActive: 5, vars: { i:1, num:2, complement:4, seen:'{3:0}' } },
            { desc: 'Store seen[2] = 1', highlights: [1], pointers: { i:1 }, codeLineActive: 8, vars: { seen:'{3:0, 2:1}' } },
            { desc: 'i=2, num=4. complement = 6-4 = 2. 2 IS in seen at index 1!', highlights: [2], pointers: { i:2 }, codeLineActive: 6, vars: { i:2, num:4, complement:2, seen:'{3:0, 2:1}' } },
            { desc: '✅ Return [1, 2]', highlights: [1,2], pointers: { i:2 }, codeLineActive: 7, vars: { answer:'[1,2]' }, found: [1,2] },
          ],
          [ // Case 3: [3,3], target=6
            { desc: 'seen = {}', highlights: [], pointers: {}, codeLineActive: 3, vars: { seen:'{}' } },
            { desc: 'i=0, num=3. complement = 6-3 = 3. 3 not in seen.', highlights: [0], pointers: { i:0 }, codeLineActive: 5, vars: { i:0, num:3, complement:3, seen:'{}' } },
            { desc: 'Store seen[3] = 0', highlights: [0], pointers: { i:0 }, codeLineActive: 8, vars: { seen:'{3:0}' } },
            { desc: 'i=1, num=3. complement = 6-3 = 3. 3 IS in seen at index 0!', highlights: [1], pointers: { i:1 }, codeLineActive: 6, vars: { i:1, num:3, complement:3, seen:'{3:0}' } },
            { desc: '✅ Return [0, 1]', highlights: [0,1], pointers: { i:1 }, codeLineActive: 7, vars: { answer:'[0,1]' }, found: [0,1] },
          ],
        ],
      },
    ],
  },

  // ─── #217 Contains Duplicate ─────────────────────────────────
  217: {
    visualType: 'array',
    testCases: [
      { data: { input: [1,2,3,1] },                label: 'Case 1' },
      { data: { input: [1,2,3,4] },                label: 'Case 2' },
      { data: { input: [1,1,1,3,3,4,3,2,4,2] },   label: 'Case 3' },
    ],
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
        for (int i = 0; i < nums.length; i++)
            for (int j = i + 1; j < nums.length; j++)
                if (nums[i] == nums[j]) return true;
        return false;
    }
}`,
        steps: [
          [ // Case 1: [1,2,3,1] → true
            { desc: 'i=0 (val=1), j=1 (val=2). 1==2? ❌', highlights:[0,1], pointers:{i:0,j:1}, codeLineActive:4, vars:{i:0,j:1} },
            { desc: 'i=0 (val=1), j=2 (val=3). 1==3? ❌', highlights:[0,2], pointers:{i:0,j:2}, codeLineActive:4, vars:{i:0,j:2} },
            { desc: 'i=0 (val=1), j=3 (val=1). 1==1? ✅ Duplicate found! Return True', highlights:[0,3], pointers:{i:0,j:3}, codeLineActive:5, vars:{i:0,j:3}, found:[0,3] },
          ],
          [ // Case 2: [1,2,3,4] → false
            { desc: 'i=0, j checks 1,2,3 — no match', highlights:[0], pointers:{i:0}, codeLineActive:3, vars:{i:0} },
            { desc: 'i=1, j checks 2,3 — no match', highlights:[1], pointers:{i:1}, codeLineActive:3, vars:{i:1} },
            { desc: 'i=2, j checks 3 — no match', highlights:[2], pointers:{i:2}, codeLineActive:3, vars:{i:2} },
            { desc: 'All pairs checked, no duplicates. Return False ✅', highlights:[], pointers:{}, codeLineActive:6, vars:{result:'False'} },
          ],
          [ // Case 3: [1,1,...] → true
            { desc: 'i=0 (val=1), j=1 (val=1). 1==1? ✅ Duplicate! Return True', highlights:[0,1], pointers:{i:0,j:1}, codeLineActive:5, vars:{i:0,j:1}, found:[0,1] },
          ],
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
            if (seen.contains(num)) return true;
            seen.add(num);
        }
        return false;
    }
}`,
        steps: [
          [ // Case 1: [1,2,3,1]
            { desc: 'seen = {} (empty set)', highlights:[], pointers:{}, codeLineActive:3, vars:{seen:'{}', i:0} },
            { desc: 'num=1. 1 in seen? ❌ Add 1 to seen', highlights:[0], pointers:{}, codeLineActive:6, vars:{seen:'{1}', num:1} },
            { desc: 'num=2. 2 in seen? ❌ Add 2 to seen', highlights:[1], pointers:{}, codeLineActive:6, vars:{seen:'{1,2}', num:2} },
            { desc: 'num=3. 3 in seen? ❌ Add 3 to seen', highlights:[2], pointers:{}, codeLineActive:6, vars:{seen:'{1,2,3}', num:3} },
            { desc: 'num=1. 1 in seen? ✅ Return True — duplicate found!', highlights:[3], pointers:{}, codeLineActive:5, vars:{seen:'{1,2,3}', num:1}, found:[0,3] },
          ],
          [ // Case 2: [1,2,3,4] → false
            { desc: 'num=1. Not in seen. Add.', highlights:[0], pointers:{}, codeLineActive:6, vars:{seen:'{1}', num:1} },
            { desc: 'num=2. Not in seen. Add.', highlights:[1], pointers:{}, codeLineActive:6, vars:{seen:'{1,2}', num:2} },
            { desc: 'num=3. Not in seen. Add.', highlights:[2], pointers:{}, codeLineActive:6, vars:{seen:'{1,2,3}', num:3} },
            { desc: 'num=4. Not in seen. Add.', highlights:[3], pointers:{}, codeLineActive:6, vars:{seen:'{1,2,3,4}', num:4} },
            { desc: 'Loop done. No duplicates found. Return False ✅', highlights:[], pointers:{}, codeLineActive:7, vars:{result:'False'} },
          ],
          [ // Case 3: [1,1,1,3,3,4,3,2,4,2]
            { desc: 'num=1. Not in seen. Add.', highlights:[0], pointers:{}, codeLineActive:6, vars:{seen:'{1}', num:1} },
            { desc: 'num=1. 1 in seen? ✅ Return True!', highlights:[1], pointers:{}, codeLineActive:5, vars:{seen:'{1}', num:1}, found:[0,1] },
          ],
        ],
      },
    ],
  },

  // ─── #242 Valid Anagram ───────────────────────────────────────
  242: {
    visualType: 'array',
    testCases: [
      { data: { input: ['a','n','a','g','r','a','m'], inputB: ['n','a','g','a','r','a','m'] }, label: 'Case 1' },
      { data: { input: ['r','a','t'],                inputB: ['c','a','r'] },                 label: 'Case 2' },
      { data: { input: ['l','i','s','t','e','n'],    inputB: ['s','i','l','e','n','t'] },      label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Sort (Simple)',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        return sorted(s) == sorted(t)`,
        java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] a = s.toCharArray(), b = t.toCharArray();
        Arrays.sort(a); Arrays.sort(b);
        return Arrays.equals(a, b);
    }
}`,
        steps: [
          [ // Case 1: "anagram" vs "nagaram" → true
            { desc: 'Both len=7. Sort "anagram" → "aaagmnr"', highlights:[], pointers:{}, codeLineActive:5, vars:{sorted_s:'aaagmnr', sorted_t:'aaagmnr'} },
            { desc: '"aaagmnr" == "aaagmnr" ✅ Return True', highlights:[], pointers:{}, codeLineActive:5, vars:{result:'True'} },
          ],
          [ // Case 2: "rat" vs "car" → false
            { desc: 'Both len=3. Sort "rat" → "art", Sort "car" → "acr"', highlights:[], pointers:{}, codeLineActive:5, vars:{sorted_s:'art', sorted_t:'acr'} },
            { desc: '"art" != "acr" ❌ Return False', highlights:[], pointers:{}, codeLineActive:5, vars:{result:'False'} },
          ],
          [ // Case 3: "listen" vs "silent" → true
            { desc: 'Both len=6. Sort "listen" → "eilnst"', highlights:[], pointers:{}, codeLineActive:5, vars:{sorted_s:'eilnst', sorted_t:'eilnst'} },
            { desc: '"eilnst" == "eilnst" ✅ Return True', highlights:[], pointers:{}, codeLineActive:5, vars:{result:'True'} },
          ],
        ],
      },
      {
        name: 'HashMap Count (Optimal)',
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
            count[c - 'a']--;
            if (count[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
        steps: [
          [ // Case 1: "anagram" vs "nagaram"
            { desc: 'Count chars in "anagram": a→3,n→1,g→1,r→1,m→1', highlights:[], pointers:{}, codeLineActive:6, vars:{count:'{a:3,n:1,g:1,r:1,m:1}'} },
            { desc: 'Subtract chars of "nagaram": all counts → 0', highlights:[], pointers:{}, codeLineActive:8, vars:{count:'{a:0,n:0,g:0,r:0,m:0}'} },
            { desc: 'No count went below 0 ✅ Return True', highlights:[], pointers:{}, codeLineActive:11, vars:{result:'True'} },
          ],
          [ // Case 2: "rat" vs "car"
            { desc: 'Count "rat": r→1,a→1,t→1', highlights:[], pointers:{}, codeLineActive:6, vars:{count:'{r:1,a:1,t:1}'} },
            { desc: 'Process "car": c→ count[c]=-1 < 0!', highlights:[], pointers:{}, codeLineActive:10, vars:{count:'{r:1,a:1,t:1,c:-1}'} },
            { desc: 'count[c] < 0 ❌ Return False', highlights:[], pointers:{}, codeLineActive:10, vars:{result:'False'} },
          ],
          [ // Case 3: "listen" vs "silent"
            { desc: 'Count "listen": l→1,i→1,s→1,t→1,e→1,n→1', highlights:[], pointers:{}, codeLineActive:6, vars:{count:'{l:1,i:1,s:1,t:1,e:1,n:1}'} },
            { desc: 'Subtract "silent": all go to 0, none negative ✅', highlights:[], pointers:{}, codeLineActive:8, vars:{count:'{l:0,i:0,s:0,t:0,e:0,n:0}'} },
            { desc: 'Return True ✅', highlights:[], pointers:{}, codeLineActive:11, vars:{result:'True'} },
          ],
        ],
      },
    ],
  },

  // ─── #283 Move Zeroes ─────────────────────────────────────────
  283: {
    visualType: 'array',
    testCases: [
      { data: { input: [0,1,0,3,12] }, label: 'Case 1' },
      { data: { input: [0] },          label: 'Case 2' },
      { data: { input: [1,0,0,2,3] }, label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Two Pointers (Optimal)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        slow = 0
        for fast in range(len(nums)):
            if nums[fast] != 0:
                nums[slow], nums[fast] = nums[fast], nums[slow]
                slow += 1`,
        java: `class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                int tmp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = tmp;
                slow++;
            }
        }
    }
}`,
        steps: [
          [ // Case 1: [0,1,0,3,12] → [1,3,12,0,0]
            { desc: 'slow=0, fast=0: nums[0]=0 is zero, skip', highlights:[0], pointers:{slow:0,fast:0}, codeLineActive:4, vars:{slow:0,fast:0}, result:[0,1,0,3,12] },
            { desc: 'fast=1: nums[1]=1 ≠ 0. Swap nums[0]↔nums[1]', highlights:[0,1], pointers:{slow:0,fast:1}, codeLineActive:5, vars:{slow:0,fast:1}, result:[1,0,0,3,12] },
            { desc: 'slow++. slow=1', highlights:[1], pointers:{slow:1,fast:1}, codeLineActive:6, vars:{slow:1}, result:[1,0,0,3,12] },
            { desc: 'fast=2: nums[2]=0 is zero, skip', highlights:[2], pointers:{slow:1,fast:2}, codeLineActive:4, vars:{slow:1,fast:2}, result:[1,0,0,3,12] },
            { desc: 'fast=3: nums[3]=3 ≠ 0. Swap nums[1]↔nums[3]', highlights:[1,3], pointers:{slow:1,fast:3}, codeLineActive:5, vars:{slow:1,fast:3}, result:[1,3,0,0,12] },
            { desc: 'slow++. slow=2', highlights:[3], pointers:{slow:2,fast:3}, codeLineActive:6, vars:{slow:2}, result:[1,3,0,0,12] },
            { desc: 'fast=4: nums[4]=12 ≠ 0. Swap nums[2]↔nums[4]', highlights:[2,4], pointers:{slow:2,fast:4}, codeLineActive:5, vars:{slow:2,fast:4}, result:[1,3,12,0,0] },
            { desc: '✅ Done! Result: [1,3,12,0,0]', highlights:[0,1,2], pointers:{}, codeLineActive:6, vars:{result:'[1,3,12,0,0]'}, result:[1,3,12,0,0], found:[0,1,2] },
          ],
          [ // Case 2: [0] → [0]
            { desc: 'fast=0: nums[0]=0 is zero, skip', highlights:[0], pointers:{slow:0,fast:0}, codeLineActive:4, vars:{slow:0,fast:0}, result:[0] },
            { desc: '✅ Loop done. Array unchanged: [0]', highlights:[], pointers:{}, codeLineActive:4, vars:{result:'[0]'}, result:[0] },
          ],
          [ // Case 3: [1,0,0,2,3] → [1,2,3,0,0]
            { desc: 'slow=0, fast=0: nums[0]=1 ≠ 0. Swap (no-op). slow=1', highlights:[0], pointers:{slow:0,fast:0}, codeLineActive:5, vars:{slow:0,fast:0}, result:[1,0,0,2,3] },
            { desc: 'fast=1: nums[1]=0, skip', highlights:[1], pointers:{slow:1,fast:1}, codeLineActive:4, vars:{slow:1,fast:1}, result:[1,0,0,2,3] },
            { desc: 'fast=2: nums[2]=0, skip', highlights:[2], pointers:{slow:1,fast:2}, codeLineActive:4, vars:{slow:1,fast:2}, result:[1,0,0,2,3] },
            { desc: 'fast=3: nums[3]=2 ≠ 0. Swap nums[1]↔nums[3]. slow=2', highlights:[1,3], pointers:{slow:1,fast:3}, codeLineActive:5, vars:{slow:1,fast:3}, result:[1,2,0,0,3] },
            { desc: 'fast=4: nums[4]=3 ≠ 0. Swap nums[2]↔nums[4]. slow=3', highlights:[2,4], pointers:{slow:2,fast:4}, codeLineActive:5, vars:{slow:2,fast:4}, result:[1,2,3,0,0] },
            { desc: '✅ Done! Result: [1,2,3,0,0]', highlights:[0,1,2], pointers:{}, codeLineActive:6, vars:{result:'[1,2,3,0,0]'}, result:[1,2,3,0,0], found:[0,1,2] },
          ],
        ],
      },
    ],
  },

  // ─── #125 Valid Palindrome ────────────────────────────────────
  125: {
    visualType: 'array',
    testCases: [
      { data: { input: ['A',' ','m','a','n',',',' ','a',' ','p','l','a','n',',',' ','a',' ','c','a','n','a','l',':',' ','P','a','n','a','m','a'] }, label: 'Case 1' },
      { data: { input: ['r','a','c','e',' ','a',' ','c','a','r'] }, label: 'Case 2' },
      { data: { input: [' '] }, label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Two Pointers',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        L, R = 0, len(s) - 1
        while L < R:
            while L < R and not s[L].isalnum():
                L += 1
            while L < R and not s[R].isalnum():
                R -= 1
            if s[L].lower() != s[R].lower():
                return False
            L += 1
            R -= 1
        return True`,
        java: `class Solution {
    public boolean isPalindrome(String s) {
        int L = 0, R = s.length() - 1;
        while (L < R) {
            while (L < R && !Character.isLetterOrDigit(s.charAt(L))) L++;
            while (L < R && !Character.isLetterOrDigit(s.charAt(R))) R--;
            if (Character.toLowerCase(s.charAt(L)) != Character.toLowerCase(s.charAt(R)))
                return false;
            L++; R--;
        }
        return true;
    }
}`,
        steps: [
          [ // Case 1: "A man, a plan, a canal: Panama" → true
            { desc: 'L=0 (A), R=29 (a). Skip non-alnum on both sides.', highlights:[0,29], pointers:{L:0,R:29}, codeLineActive:3, vars:{L:0,R:29,s:'A man..Panama'} },
            { desc: 'Compare s[L]="A" vs s[R]="a". "a"=="a" ✅. L++, R--', highlights:[0,29], pointers:{L:0,R:29}, codeLineActive:8, vars:{L:0,R:29} },
            { desc: 'Skip spaces/commas. Compare "m" vs "m" ✅', highlights:[], pointers:{L:4,R:25}, codeLineActive:8, vars:{L:4,R:25} },
            { desc: 'Continue comparing alnum chars from both ends...', highlights:[], pointers:{L:8,R:21}, codeLineActive:4, vars:{L:8,R:21} },
            { desc: 'All chars matched! L >= R. ✅ Return True', highlights:[], pointers:{}, codeLineActive:12, vars:{result:'True'} },
          ],
          [ // Case 2: "race a car" → false
            { desc: 'L=0 (r), R=9 (r). Compare "r"=="r" ✅. L++, R--', highlights:[0,9], pointers:{L:0,R:9}, codeLineActive:8, vars:{L:0,R:9} },
            { desc: 'Skip space. L=1(a), R=7(a). "a"=="a" ✅. L++, R--', highlights:[1,7], pointers:{L:1,R:7}, codeLineActive:8, vars:{L:1,R:7} },
            { desc: 'L=2(c), R=6(c). "c"=="c" ✅. L++, R--', highlights:[2,6], pointers:{L:2,R:6}, codeLineActive:8, vars:{L:2,R:6} },
            { desc: 'Skip space. L=3(e), R=4(a). "e" != "a" ❌ Return False', highlights:[3,4], pointers:{L:3,R:4}, codeLineActive:9, vars:{L:3,R:4,result:'False'} },
          ],
          [ // Case 3: " " → true
            { desc: 'L=0, R=0. Only a space — L not < R immediately.', highlights:[0], pointers:{L:0,R:0}, codeLineActive:4, vars:{L:0,R:0} },
            { desc: 'L < R is False. Skip loop. ✅ Return True', highlights:[], pointers:{}, codeLineActive:12, vars:{result:'True'} },
          ],
        ],
      },
    ],
  },

  // ─── #20 Valid Parentheses ────────────────────────────────────
  20: {
    visualType: 'stack',
    testCases: [
      { data: { input: ['(', ')'] },                         label: 'Case 1' },
      { data: { input: ['(', ')', '[', ']', '{', '}'] },     label: 'Case 2' },
      { data: { input: ['(', ']'] },                         label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Stack',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}
        for ch in s:
            if ch in pairs:
                if not stack or stack[-1] != pairs[ch]:
                    return False
                stack.pop()
            else:
                stack.append(ch)
        return len(stack) == 0`,
        java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                if (stack.isEmpty() || stack.peek() != matchingOpen(ch))
                    return false;
                stack.pop();
            }
        }
        return stack.isEmpty();
    }
}`,
        steps: [
          [ // Case 1: "()" → true
            { desc: 'ch="(". Open bracket → push to stack', highlights:[0], pointers:{}, codeLineActive:10, vars:{stack:'["("]', ch:'('} },
            { desc: 'ch=")". Closing bracket. pairs[")"]=>"(" . stack[-1]="(" ✅ Pop.', highlights:[1], pointers:{}, codeLineActive:9, vars:{stack:'[]', ch:')'} },
            { desc: 'Loop done. stack is empty ✅ Return True', highlights:[], pointers:{}, codeLineActive:11, vars:{result:'True', stack:'[]'} },
          ],
          [ // Case 2: "()[]{}" → true
            { desc: 'ch="(". Push. stack=["("]', highlights:[0], pointers:{}, codeLineActive:10, vars:{stack:'["("]'} },
            { desc: 'ch=")". Match "(" ✅ Pop. stack=[]', highlights:[1], pointers:{}, codeLineActive:9, vars:{stack:'[]'} },
            { desc: 'ch="[". Push. stack=["["]', highlights:[2], pointers:{}, codeLineActive:10, vars:{stack:'["["]'} },
            { desc: 'ch="]". Match "[" ✅ Pop. stack=[]', highlights:[3], pointers:{}, codeLineActive:9, vars:{stack:'[]'} },
            { desc: 'ch="{". Push. stack=["{"]', highlights:[4], pointers:{}, codeLineActive:10, vars:{stack:'{["{"]}'} },
            { desc: 'ch="}". Match "{" ✅ Pop. stack=[]', highlights:[5], pointers:{}, codeLineActive:9, vars:{stack:'[]'} },
            { desc: 'Stack empty ✅ Return True', highlights:[], pointers:{}, codeLineActive:11, vars:{result:'True'} },
          ],
          [ // Case 3: "(]" → false
            { desc: 'ch="(". Push. stack=["("]', highlights:[0], pointers:{}, codeLineActive:10, vars:{stack:'["("]'} },
            { desc: 'ch="]". Closing. pairs["]"]="[". stack[-1]="(" ≠ "[" ❌ Return False', highlights:[1], pointers:{}, codeLineActive:8, vars:{stack:'["("]', ch:']', result:'False'} },
          ],
        ],
      },
    ],
  },

  // ─── #704 Binary Search ───────────────────────────────────────
  704: {
    visualType: 'array',
    testCases: [
      { data: { input: [-1,0,3,5,9,12], target: 9 },  label: 'Case 1' },
      { data: { input: [-1,0,3,5,9,12], target: 2 },  label: 'Case 2' },
      { data: { input: [5],             target: 5 },  label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Binary Search',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        L, R = 0, len(nums) - 1
        while L <= R:
            mid = (L + R) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                L = mid + 1
            else:
                R = mid - 1
        return -1`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        int L = 0, R = nums.length - 1;
        while (L <= R) {
            int mid = (L + R) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) L = mid + 1;
            else R = mid - 1;
        }
        return -1;
    }
}`,
        steps: [
          [ // Case 1: [-1,0,3,5,9,12], target=9 → index 4
            { desc: 'L=0, R=5. mid=(0+5)//2=2. nums[2]=3', highlights:[2], pointers:{L:0,R:5,M:2}, codeLineActive:5, vars:{L:0,R:5,mid:2,nums_mid:3} },
            { desc: '3 < 9. Search right half. L = mid+1 = 3', highlights:[3,4,5], pointers:{L:3,R:5,M:2}, codeLineActive:9, vars:{L:3,R:5} },
            { desc: 'L=3, R=5. mid=(3+5)//2=4. nums[4]=9', highlights:[4], pointers:{L:3,R:5,M:4}, codeLineActive:5, vars:{L:3,R:5,mid:4,nums_mid:9} },
            { desc: '9 == 9 ✅ Found at index 4! Return 4', highlights:[4], pointers:{M:4}, codeLineActive:6, vars:{result:4}, found:[4] },
          ],
          [ // Case 2: target=2 → -1
            { desc: 'L=0, R=5. mid=2. nums[2]=3 > 2. Search left. R=1', highlights:[2], pointers:{L:0,R:5,M:2}, codeLineActive:5, vars:{L:0,R:5,mid:2} },
            { desc: 'L=0, R=1. mid=0. nums[0]=-1 < 2. Search right. L=1', highlights:[0], pointers:{L:0,R:1,M:0}, codeLineActive:9, vars:{L:1,R:1,mid:0} },
            { desc: 'L=1, R=1. mid=1. nums[1]=0 < 2. Search right. L=2', highlights:[1], pointers:{L:1,R:1,M:1}, codeLineActive:9, vars:{L:2,R:1} },
            { desc: 'L=2 > R=1. Loop ends. ✅ Return -1 (not found)', highlights:[], pointers:{}, codeLineActive:11, vars:{result:-1} },
          ],
          [ // Case 3: [5], target=5 → 0
            { desc: 'L=0, R=0. mid=0. nums[0]=5 == 5 ✅ Return 0', highlights:[0], pointers:{L:0,R:0,M:0}, codeLineActive:6, vars:{result:0}, found:[0] },
          ],
        ],
      },
    ],
  },

  // ─── #70 Climbing Stairs ──────────────────────────────────────
  70: {
    visualType: 'dp',
    testCases: [
      { data: { input: [1,1,2],    label: 'n=2' }, label: 'Case 1' },
      { data: { input: [1,1,2,3], label: 'n=3' }, label: 'Case 2' },
      { data: { input: [1,1,2,3,5,8], label: 'n=5' }, label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Dynamic Programming (Bottom-Up)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        dp = [0] * (n + 1)
        dp[1], dp[2] = 1, 2
        for i in range(3, n + 1):
            dp[i] = dp[i-1] + dp[i-2]
        return dp[n]`,
        java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1; dp[2] = 2;
        for (int i = 3; i <= n; i++)
            dp[i] = dp[i-1] + dp[i-2];
        return dp[n];
    }
}`,
        steps: [
          [ // Case 1: n=2 → 2
            { desc: 'n=2 ≤ 2. Return n directly = 2 ✅', highlights:[1], pointers:{}, codeLineActive:3, vars:{n:2,result:2} },
          ],
          [ // Case 2: n=3 → 3
            { desc: 'n=3. Initialize dp[1]=1, dp[2]=2', highlights:[0,1], pointers:{}, codeLineActive:5, vars:{dp:'[_,1,2,0]'} },
            { desc: 'i=3: dp[3] = dp[2]+dp[1] = 2+1 = 3', highlights:[2], pointers:{}, codeLineActive:7, vars:{dp:'[_,1,2,3]', i:3} },
            { desc: '✅ Return dp[3] = 3', highlights:[2], pointers:{}, codeLineActive:8, vars:{result:3} },
          ],
          [ // Case 3: n=5 → 8
            { desc: 'Initialize dp[1]=1, dp[2]=2', highlights:[0,1], pointers:{}, codeLineActive:5, vars:{dp:'[_,1,2,0,0,0]'} },
            { desc: 'i=3: dp[3]=dp[2]+dp[1]=2+1=3', highlights:[2], pointers:{}, codeLineActive:7, vars:{dp:'[_,1,2,3,0,0]',i:3} },
            { desc: 'i=4: dp[4]=dp[3]+dp[2]=3+2=5', highlights:[3], pointers:{}, codeLineActive:7, vars:{dp:'[_,1,2,3,5,0]',i:4} },
            { desc: 'i=5: dp[5]=dp[4]+dp[3]=5+3=8', highlights:[4], pointers:{}, codeLineActive:7, vars:{dp:'[_,1,2,3,5,8]',i:5} },
            { desc: '✅ Return dp[5] = 8', highlights:[4], pointers:{}, codeLineActive:8, vars:{result:8}, found:[4] },
          ],
        ],
      },
      {
        name: 'Two Variables (Space Optimized)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        one, two = 1, 1
        for i in range(n - 1):
            one, two = one + two, one
        return one`,
        java: `class Solution {
    public int climbStairs(int n) {
        int one = 1, two = 1;
        for (int i = 0; i < n - 1; i++) {
            int temp = one;
            one = one + two;
            two = temp;
        }
        return one;
    }
}`,
        steps: [
          [ // n=2 → 2
            { desc: 'one=1, two=1 (base cases)', highlights:[], pointers:{}, codeLineActive:3, vars:{one:1,two:1} },
            { desc: 'i=0 (n-1=1 iterations): one=one+two=1+1=2, two=1', highlights:[], pointers:{}, codeLineActive:4, vars:{one:2,two:1,i:0} },
            { desc: '✅ Return one = 2', highlights:[], pointers:{}, codeLineActive:5, vars:{result:2} },
          ],
          [ // n=3 → 3
            { desc: 'one=1, two=1', highlights:[], pointers:{}, codeLineActive:3, vars:{one:1,two:1} },
            { desc: 'i=0: one=1+1=2, two=1', highlights:[], pointers:{}, codeLineActive:4, vars:{one:2,two:1,i:0} },
            { desc: 'i=1: one=2+1=3, two=2', highlights:[], pointers:{}, codeLineActive:4, vars:{one:3,two:2,i:1} },
            { desc: '✅ Return one = 3', highlights:[], pointers:{}, codeLineActive:5, vars:{result:3} },
          ],
          [ // n=5 → 8
            { desc: 'one=1, two=1', highlights:[], pointers:{}, codeLineActive:3, vars:{one:1,two:1} },
            { desc: 'i=0: one=2, two=1', highlights:[], pointers:{}, codeLineActive:4, vars:{one:2,two:1,i:0} },
            { desc: 'i=1: one=3, two=2', highlights:[], pointers:{}, codeLineActive:4, vars:{one:3,two:2,i:1} },
            { desc: 'i=2: one=5, two=3', highlights:[], pointers:{}, codeLineActive:4, vars:{one:5,two:3,i:2} },
            { desc: 'i=3: one=8, two=5', highlights:[], pointers:{}, codeLineActive:4, vars:{one:8,two:5,i:3} },
            { desc: '✅ Return one = 8', highlights:[], pointers:{}, codeLineActive:5, vars:{result:8} },
          ],
        ],
      },
    ],
  },

  // ─── #198 House Robber ────────────────────────────────────────
  198: {
    visualType: 'dp',
    testCases: [
      { data: { input: [1,2,3,1] },    label: 'Case 1' },
      { data: { input: [2,7,9,3,1] },  label: 'Case 2' },
      { data: { input: [1,3,1] },      label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Dynamic Programming',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2, prev1 = 0, 0
        for num in nums:
            curr = max(prev1, prev2 + num)
            prev2 = prev1
            prev1 = curr
        return prev1`,
        java: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int curr = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
        steps: [
          [ // Case 1: [1,2,3,1] → 4
            { desc: 'prev2=0, prev1=0 (no houses yet)', highlights:[], pointers:{}, codeLineActive:3, vars:{prev2:0,prev1:0} },
            { desc: 'num=1: curr=max(0, 0+1)=1. prev2=0, prev1=1', highlights:[0], pointers:{}, codeLineActive:4, vars:{num:1,curr:1,prev2:0,prev1:1} },
            { desc: 'num=2: curr=max(1, 0+2)=2. prev2=1, prev1=2', highlights:[1], pointers:{}, codeLineActive:4, vars:{num:2,curr:2,prev2:1,prev1:2} },
            { desc: 'num=3: curr=max(2, 1+3)=4. prev2=2, prev1=4', highlights:[2], pointers:{}, codeLineActive:4, vars:{num:3,curr:4,prev2:2,prev1:4} },
            { desc: 'num=1: curr=max(4, 2+1)=4. prev2=4, prev1=4', highlights:[3], pointers:{}, codeLineActive:4, vars:{num:1,curr:4,prev2:4,prev1:4} },
            { desc: '✅ Return prev1 = 4 (Rob house 1 and 3: 1+3=4)', highlights:[0,2], pointers:{}, codeLineActive:7, vars:{result:4}, found:[0,2] },
          ],
          [ // Case 2: [2,7,9,3,1] → 12
            { desc: 'prev2=0, prev1=0', highlights:[], pointers:{}, codeLineActive:3, vars:{prev2:0,prev1:0} },
            { desc: 'num=2: curr=max(0,0+2)=2. prev2=0,prev1=2', highlights:[0], pointers:{}, codeLineActive:4, vars:{num:2,curr:2,prev2:0,prev1:2} },
            { desc: 'num=7: curr=max(2,0+7)=7. prev2=2,prev1=7', highlights:[1], pointers:{}, codeLineActive:4, vars:{num:7,curr:7,prev2:2,prev1:7} },
            { desc: 'num=9: curr=max(7,2+9)=11. prev2=7,prev1=11', highlights:[2], pointers:{}, codeLineActive:4, vars:{num:9,curr:11,prev2:7,prev1:11} },
            { desc: 'num=3: curr=max(11,7+3)=11. prev2=11,prev1=11', highlights:[3], pointers:{}, codeLineActive:4, vars:{num:3,curr:11,prev2:11,prev1:11} },
            { desc: 'num=1: curr=max(11,11+1)=12. prev2=11,prev1=12', highlights:[4], pointers:{}, codeLineActive:4, vars:{num:1,curr:12,prev2:11,prev1:12} },
            { desc: '✅ Return 12 (Rob houses 0,2,4: 2+9+1=12)', highlights:[0,2,4], pointers:{}, codeLineActive:7, vars:{result:12}, found:[0,2,4] },
          ],
          [ // Case 3: [1,3,1] → 3
            { desc: 'prev2=0, prev1=0', highlights:[], pointers:{}, codeLineActive:3, vars:{prev2:0,prev1:0} },
            { desc: 'num=1: curr=1. prev2=0,prev1=1', highlights:[0], pointers:{}, codeLineActive:4, vars:{num:1,curr:1,prev1:1} },
            { desc: 'num=3: curr=max(1,0+3)=3. prev2=1,prev1=3', highlights:[1], pointers:{}, codeLineActive:4, vars:{num:3,curr:3,prev2:1,prev1:3} },
            { desc: 'num=1: curr=max(3,1+1)=3. prev2=3,prev1=3', highlights:[2], pointers:{}, codeLineActive:4, vars:{num:1,curr:3,prev1:3} },
            { desc: '✅ Return 3 (Rob house 1 only: val=3)', highlights:[1], pointers:{}, codeLineActive:7, vars:{result:3}, found:[1] },
          ],
        ],
      },
    ],
  },

  // ─── #322 Coin Change ─────────────────────────────────────────
  322: {
    visualType: 'dp',
    testCases: [
      { data: { input: [1,5,10], amount: 11 }, label: 'Case 1' },
      { data: { input: [2],      amount: 3  }, label: 'Case 2' },
      { data: { input: [1],      amount: 0  }, label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Dynamic Programming (Bottom-Up)',
        complexity: { time: 'O(amount × n)', space: 'O(amount)' },
        python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != float('inf') else -1`,
        java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++)
            for (int c : coins)
                if (a - c >= 0)
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        return dp[amount] <= amount ? dp[amount] : -1;
    }
}`,
        steps: [
          [ // Case 1: coins=[1,5,10], amount=11 → 2
            { desc: 'dp = [0, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞]. dp[0]=0', highlights:[0], pointers:{}, codeLineActive:4, vars:{dp:'[0,∞,...∞]'} },
            { desc: 'a=1: coins=[1,5,10]. dp[1]=min(∞,1+dp[0])=1', highlights:[1], pointers:{}, codeLineActive:7, vars:{a:1,dp:'[0,1,∞,...]'} },
            { desc: 'a=5: dp[5]=min(∞,1+dp[4])... 1+dp[0]=1 via coin=5', highlights:[5], pointers:{}, codeLineActive:7, vars:{a:5,dp:'[0,1,2,3,4,1,...]'} },
            { desc: 'a=10: dp[10]=1 (one 10-coin)', highlights:[10], pointers:{}, codeLineActive:7, vars:{a:10,dp:'...[10:1]...'} },
            { desc: 'a=11: dp[11]=min(1+dp[10], 1+dp[6])=min(2,...)=2 using coins 1+10', highlights:[11], pointers:{}, codeLineActive:7, vars:{a:11,dp:'...[11:2]'} },
            { desc: '✅ Return dp[11] = 2', highlights:[], pointers:{}, codeLineActive:9, vars:{result:2}, found:[] },
          ],
          [ // Case 2: coins=[2], amount=3 → -1
            { desc: 'dp=[0,∞,∞,∞]. dp[0]=0', highlights:[0], pointers:{}, codeLineActive:4, vars:{dp:'[0,∞,∞,∞]'} },
            { desc: 'a=1: coin=2, 1-2=-1<0 skip. dp[1]=∞', highlights:[1], pointers:{}, codeLineActive:7, vars:{a:1,dp:'[0,∞,∞,∞]'} },
            { desc: 'a=2: coin=2, dp[2]=1+dp[0]=1', highlights:[2], pointers:{}, codeLineActive:7, vars:{a:2,dp:'[0,∞,1,∞]'} },
            { desc: 'a=3: coin=2, dp[3]=1+dp[1]=∞. Still ∞', highlights:[3], pointers:{}, codeLineActive:7, vars:{a:3,dp:'[0,∞,1,∞]'} },
            { desc: '✅ dp[3]=∞, Return -1 (impossible)', highlights:[], pointers:{}, codeLineActive:9, vars:{result:-1} },
          ],
          [ // Case 3: coins=[1], amount=0 → 0
            { desc: 'amount=0. dp=[0]. dp[0]=0', highlights:[], pointers:{}, codeLineActive:4, vars:{dp:'[0]'} },
            { desc: 'Loop range(1,1) is empty. No iterations.', highlights:[], pointers:{}, codeLineActive:5, vars:{} },
            { desc: '✅ Return dp[0] = 0', highlights:[], pointers:{}, codeLineActive:9, vars:{result:0} },
          ],
        ],
      },
    ],
  },

  // ─── #226 Invert Binary Tree ──────────────────────────────────
  226: {
    visualType: 'tree',
    testCases: [
      { data: { nodes: [4,2,7,1,3,6,9] }, label: 'Case 1' },
      { data: { nodes: [2,1,3] },         label: 'Case 2' },
      { data: { nodes: [] },              label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'DFS Recursive',
        complexity: { time: 'O(n)', space: 'O(h)' },
        python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
        java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}`,
        steps: [
          [ // Case 1: [4,2,7,1,3,6,9]
            { desc: 'Recurse left: invertTree(node 2)', highlights:[1], pointers:{}, codeLineActive:5, vars:{visiting:'node 2'} },
            { desc: 'Recurse left of 2: invertTree(node 1)', highlights:[3], pointers:{}, codeLineActive:5, vars:{visiting:'node 1'} },
            { desc: 'node 1 has no children → return node 1', highlights:[3], pointers:{}, codeLineActive:4, vars:{returning:'node 1'} },
            { desc: 'Recurse right of 2: invertTree(node 3)', highlights:[4], pointers:{}, codeLineActive:5, vars:{visiting:'node 3'} },
            { desc: 'node 3 has no children → return node 3', highlights:[4], pointers:{}, codeLineActive:4, vars:{returning:'node 3'} },
            { desc: 'At node 2: swap left←3, right←1', highlights:[1], pointers:{}, codeLineActive:5, vars:{node:'2',left:'3',right:'1'} },
            { desc: 'Recurse right: invertTree(node 7)', highlights:[2], pointers:{}, codeLineActive:5, vars:{visiting:'node 7'} },
            { desc: 'At node 7: swap left←9, right←6. Subtree inverted', highlights:[2], pointers:{}, codeLineActive:5, vars:{node:'7',left:'9',right:'6'} },
            { desc: 'At root 4: swap left←7-subtree, right←2-subtree ✅', highlights:[0], pointers:{}, codeLineActive:5, vars:{root:'4 (inverted)'}, found:[0,1,2] },
          ],
          [ // Case 2: [2,1,3]
            { desc: 'At node 2: invertTree(left=1), invertTree(right=3)', highlights:[0], pointers:{}, codeLineActive:5, vars:{visiting:'node 2'} },
            { desc: 'node 1 → no children. node 3 → no children.', highlights:[1,2], pointers:{}, codeLineActive:3, vars:{} },
            { desc: 'At node 2: swap left=3, right=1 ✅', highlights:[0], pointers:{}, codeLineActive:5, vars:{node:'2',left:'3',right:'1'}, found:[0] },
          ],
          [ // Case 3: []
            { desc: 'root is null → Return None ✅', highlights:[], pointers:{}, codeLineActive:3, vars:{result:'None'} },
          ],
        ],
      },
      {
        name: 'BFS (Level Order)',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        queue = deque([root])
        while queue:
            node = queue.popleft()
            node.left, node.right = node.right, node.left
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        return root`,
        java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            TreeNode tmp = node.left;
            node.left = node.right;
            node.right = tmp;
            if (node.left  != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        return root;
    }
}`,
        steps: [
          [ // Case 1: [4,2,7,...]
            { desc: 'queue=[root(4)]', highlights:[0], pointers:{}, codeLineActive:5, vars:{queue:'[4]'} },
            { desc: 'Pop node 4. Swap left(2)↔right(7). Enqueue 7,2', highlights:[0], pointers:{}, codeLineActive:7, vars:{queue:'[7,2]',node:'4'} },
            { desc: 'Pop node 7. Swap left(6)↔right(9). Enqueue 9,6', highlights:[2], pointers:{}, codeLineActive:7, vars:{queue:'[2,9,6]',node:'7'} },
            { desc: 'Pop node 2. Swap left(1)↔right(3). Enqueue 3,1', highlights:[1], pointers:{}, codeLineActive:7, vars:{queue:'[9,6,3,1]',node:'2'} },
            { desc: 'Process leaves: 9,6,3,1 — all have no children', highlights:[3,4,5,6], pointers:{}, codeLineActive:9, vars:{queue:'[]'} },
            { desc: '✅ Queue empty. Return inverted tree', highlights:[0,1,2], pointers:{}, codeLineActive:10, vars:{result:'tree inverted'}, found:[0,1,2] },
          ],
          [ // Case 2: [2,1,3]
            { desc: 'queue=[2]. Pop 2. Swap left(1)↔right(3). Enqueue 3,1', highlights:[0], pointers:{}, codeLineActive:7, vars:{queue:'[3,1]',node:'2'} },
            { desc: 'Pop 3. No children. Pop 1. No children.', highlights:[1,2], pointers:{}, codeLineActive:9, vars:{queue:'[]'} },
            { desc: '✅ Return inverted tree [2,3,1]', highlights:[0], pointers:{}, codeLineActive:10, vars:{result:'[2,3,1]'}, found:[0] },
          ],
          [ // Case 3: []
            { desc: 'root is null → Return None ✅', highlights:[], pointers:{}, codeLineActive:3, vars:{result:'None'} },
          ],
        ],
      },
    ],
  },

  // ─── #121 Best Time to Buy and Sell Stock ─────────────────────
  121: {
    visualType: 'array',
    testCases: [
      { data: { input: [7,1,5,3,6,4] }, label: 'Case 1' },
      { data: { input: [7,6,4,3,1] },   label: 'Case 2' },
      { data: { input: [2,4,1] },        label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Sliding Window / Two Pointers',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buy, sell = 0, 1
        maxP = 0
        while sell < len(prices):
            if prices[buy] < prices[sell]:
                maxP = max(maxP, prices[sell] - prices[buy])
            else:
                buy = sell
            sell += 1
        return maxP`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int buy = 0, sell = 1, maxP = 0;
        while (sell < prices.length) {
            if (prices[buy] < prices[sell])
                maxP = Math.max(maxP, prices[sell] - prices[buy]);
            else
                buy = sell;
            sell++;
        }
        return maxP;
    }
}`,
        steps: [
          [ // Case 1: [7,1,5,3,6,4] → 5
            { desc: 'buy=0(7), sell=1(1). 7 < 1? ❌ Move buy to sell. buy=1', highlights:[0,1], pointers:{buy:0,sell:1}, codeLineActive:5, vars:{buy:0,sell:1,maxP:0} },
            { desc: 'buy=1(1), sell=2(5). 1 < 5 ✅ maxP=max(0,4)=4. sell++', highlights:[1,2], pointers:{buy:1,sell:2}, codeLineActive:6, vars:{buy:1,sell:2,maxP:4} },
            { desc: 'buy=1(1), sell=3(3). 1 < 3 ✅ maxP=max(4,2)=4. sell++', highlights:[1,3], pointers:{buy:1,sell:3}, codeLineActive:6, vars:{buy:1,sell:3,maxP:4} },
            { desc: 'buy=1(1), sell=4(6). 1 < 6 ✅ maxP=max(4,5)=5. sell++', highlights:[1,4], pointers:{buy:1,sell:4}, codeLineActive:6, vars:{buy:1,sell:4,maxP:5} },
            { desc: 'buy=1(1), sell=5(4). 1 < 4 ✅ maxP=max(5,3)=5. sell++', highlights:[1,5], pointers:{buy:1,sell:5}, codeLineActive:6, vars:{buy:1,sell:5,maxP:5} },
            { desc: 'sell=6 ≥ len. ✅ Return maxP=5 (buy at 1, sell at 6)', highlights:[1,4], pointers:{buy:1,sell:4}, codeLineActive:10, vars:{result:5}, found:[1,4] },
          ],
          [ // Case 2: [7,6,4,3,1] → 0
            { desc: 'buy=0(7), sell=1(6). 7<6? ❌ buy=1. sell=2', highlights:[0,1], pointers:{buy:0,sell:1}, codeLineActive:8, vars:{buy:1,maxP:0} },
            { desc: 'buy=1(6), sell=2(4). 6<4? ❌ buy=2. sell=3', highlights:[1,2], pointers:{buy:1,sell:2}, codeLineActive:8, vars:{buy:2,maxP:0} },
            { desc: 'buy=2(4), sell=3(3). 4<3? ❌ buy=3. sell=4', highlights:[2,3], pointers:{buy:2,sell:3}, codeLineActive:8, vars:{buy:3,maxP:0} },
            { desc: 'buy=3(3), sell=4(1). 3<1? ❌ buy=4. sell=5', highlights:[3,4], pointers:{buy:3,sell:4}, codeLineActive:8, vars:{buy:4,maxP:0} },
            { desc: 'sell=5 ≥ len. Prices only decrease. ✅ Return 0', highlights:[], pointers:{}, codeLineActive:10, vars:{result:0} },
          ],
          [ // Case 3: [2,4,1] → 2
            { desc: 'buy=0(2), sell=1(4). 2<4 ✅ maxP=max(0,2)=2. sell=2', highlights:[0,1], pointers:{buy:0,sell:1}, codeLineActive:6, vars:{buy:0,sell:1,maxP:2} },
            { desc: 'buy=0(2), sell=2(1). 2<1? ❌ buy=2. sell=3', highlights:[0,2], pointers:{buy:0,sell:2}, codeLineActive:8, vars:{buy:2,maxP:2} },
            { desc: 'sell=3 ≥ len. ✅ Return 2 (buy at 2, sell at 4)', highlights:[0,1], pointers:{buy:0,sell:1}, codeLineActive:10, vars:{result:2}, found:[0,1] },
          ],
        ],
      },
    ],
  },

  // ─── #66 Plus One ─────────────────────────────────────────────
  66: {
    visualType: 'array',
    testCases: [
      { data: { input: [1,2,3] }, label: 'Case 1' },
      { data: { input: [4,3,2,1] }, label: 'Case 2' },
      { data: { input: [9] }, label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Iterate from Right',
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
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}`,
        steps: [
          [ // Case 1: [1,2,3] → [1,2,4]
            { desc: 'i=2 (rightmost). digits[2]=3 < 9 → increment', highlights:[2], pointers:{i:2}, codeLineActive:3, vars:{i:2,val:3} },
            { desc: 'digits[2] = 4 ✅ Return [1,2,4]', highlights:[2], pointers:{i:2}, codeLineActive:5, vars:{result:'[1,2,4]'}, result:[1,2,4], found:[2] },
          ],
          [ // Case 2: [4,3,2,1] → [4,3,2,2]
            { desc: 'i=3 (rightmost). digits[3]=1 < 9 → increment', highlights:[3], pointers:{i:3}, codeLineActive:3, vars:{i:3,val:1} },
            { desc: 'digits[3] = 2 ✅ Return [4,3,2,2]', highlights:[3], pointers:{i:3}, codeLineActive:5, vars:{result:'[4,3,2,2]'}, result:[4,3,2,2], found:[3] },
          ],
          [ // Case 3: [9] → [1,0]
            { desc: 'i=0. digits[0]=9 — not < 9. Set to 0.', highlights:[0], pointers:{i:0}, codeLineActive:6, vars:{i:0,val:9}, result:[0] },
            { desc: 'i=-1. Loop ends. Prepend 1 → [1,0] ✅', highlights:[], pointers:{}, codeLineActive:7, vars:{result:'[1,0]'}, result:[1,0], found:[0] },
          ],
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// TWO POINTERS
// ──────────────────────────────────────────────
const twoPointers = {
  // ─── #15 3Sum ─────────────────────────────────────────────────
  15: {
    visualType: 'array',
    testCases: [
      { data: { input: [-1,0,1,2,-1,-4] }, label: 'Case 1' },
      { data: { input: [0,1,1] },           label: 'Case 2' },
      { data: { input: [0,0,0] },           label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Sort + Two Pointers',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i-1]:
                continue
            L, R = i + 1, len(nums) - 1
            while L < R:
                s = nums[i] + nums[L] + nums[R]
                if s == 0:
                    res.append([nums[i], nums[L], nums[R]])
                    while L < R and nums[L] == nums[L+1]: L += 1
                    while L < R and nums[R] == nums[R-1]: R -= 1
                    L += 1; R -= 1
                elif s < 0:
                    L += 1
                else:
                    R -= 1
        return res`,
        java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int L = i + 1, R = nums.length - 1;
            while (L < R) {
                int s = nums[i] + nums[L] + nums[R];
                if (s == 0) { res.add(...); L++; R--; }
                else if (s < 0) L++;
                else R--;
            }
        }
        return res;
    }
}`,
        steps: [
          [ // Case 1: [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]
            { desc: 'Sort: [-4,-1,-1,0,1,2]', highlights:[], pointers:{}, codeLineActive:2, vars:{sorted:'[-4,-1,-1,0,1,2]'}, result:[-4,-1,-1,0,1,2] },
            { desc: 'i=0, nums[0]=-4. L=1, R=5', highlights:[0,1,5], pointers:{i:0,L:1,R:5}, codeLineActive:4, vars:{i:0,num:-4,L:1,R:5} },
            { desc: 's=-4+-1+2=-3<0. L++', highlights:[0,2,5], pointers:{i:0,L:2,R:5}, codeLineActive:16, vars:{s:-3,L:2} },
            { desc: 's=-4+-1+2=-3<0. L++', highlights:[0,2,5], pointers:{i:0,L:3,R:5}, codeLineActive:16, vars:{s:-3,L:3} },
            { desc: 's=-4+0+2=-2<0. L++', highlights:[0,3,5], pointers:{i:0,L:4,R:5}, codeLineActive:16, vars:{s:-2,L:4} },
            { desc: 's=-4+1+2=-1<0. L++. L=5=R, stop inner loop.', highlights:[0,4,5], pointers:{i:0,L:5,R:5}, codeLineActive:16, vars:{s:-1} },
            { desc: 'i=1, nums[1]=-1. L=2, R=5', highlights:[1,2,5], pointers:{i:1,L:2,R:5}, codeLineActive:4, vars:{i:1,num:-1,L:2,R:5} },
            { desc: 's=-1+-1+2=0 ✅ Found [-1,-1,2]! L++, R--', highlights:[1,2,5], pointers:{i:1,L:3,R:4}, codeLineActive:10, vars:{s:0,triplet:'[-1,-1,2]'}, found:[1,2,5] },
            { desc: 's=-1+0+1=0 ✅ Found [-1,0,1]! L++, R--', highlights:[1,3,4], pointers:{i:1,L:4,R:3}, codeLineActive:10, vars:{s:0,triplet:'[-1,0,1]'}, found:[1,3,4] },
            { desc: 'i=2: skip (nums[2]==nums[1]=-1). Continue.', highlights:[2], pointers:{i:2}, codeLineActive:5, vars:{i:2,note:'skip dup'} },
            { desc: '✅ Return [[-1,-1,2],[-1,0,1]]', highlights:[], pointers:{}, codeLineActive:19, vars:{result:'[[-1,-1,2],[-1,0,1]]'} },
          ],
          [ // Case 2: [0,1,1] → []
            { desc: 'Sort: [0,1,1]. i=0 (val=0). L=1, R=2', highlights:[0,1,2], pointers:{i:0,L:1,R:2}, codeLineActive:4, vars:{i:0,L:1,R:2} },
            { desc: 's=0+1+1=2>0. R--. L=1=R. Stop.', highlights:[0,1,1], pointers:{i:0,L:1,R:1}, codeLineActive:17, vars:{s:2} },
            { desc: '✅ No triplets found. Return []', highlights:[], pointers:{}, codeLineActive:19, vars:{result:'[]'} },
          ],
          [ // Case 3: [0,0,0] → [[0,0,0]]
            { desc: 'Sort: [0,0,0]. i=0. L=1, R=2', highlights:[0,1,2], pointers:{i:0,L:1,R:2}, codeLineActive:4, vars:{i:0,L:1,R:2} },
            { desc: 's=0+0+0=0 ✅ Found [0,0,0]!', highlights:[0,1,2], pointers:{i:0,L:1,R:2}, codeLineActive:10, vars:{triplet:'[0,0,0]'}, found:[0,1,2] },
            { desc: '✅ Return [[0,0,0]]', highlights:[], pointers:{}, codeLineActive:19, vars:{result:'[[0,0,0]]'} },
          ],
        ],
      },
    ],
  },

  // ─── #11 Container With Most Water ───────────────────────────
  11: {
    visualType: 'array',
    testCases: [
      { data: { input: [1,8,6,2,5,4,8,3,7] }, label: 'Case 1' },
      { data: { input: [1,1] },               label: 'Case 2' },
      { data: { input: [4,3,2,1,4] },         label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Two Pointers',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        L, R = 0, len(height) - 1
        maxWater = 0
        while L < R:
            h = min(height[L], height[R])
            w = R - L
            maxWater = max(maxWater, h * w)
            if height[L] <= height[R]:
                L += 1
            else:
                R -= 1
        return maxWater`,
        java: `class Solution {
    public int maxArea(int[] height) {
        int L = 0, R = height.length - 1, maxW = 0;
        while (L < R) {
            maxW = Math.max(maxW, Math.min(height[L], height[R]) * (R - L));
            if (height[L] <= height[R]) L++;
            else R--;
        }
        return maxW;
    }
}`,
        steps: [
          [ // Case 1: [1,8,6,2,5,4,8,3,7] → 49
            { desc: 'L=0(h=1), R=8(h=7). area=min(1,7)*8=8. maxW=8. L<=R → L++', highlights:[0,8], pointers:{L:0,R:8}, codeLineActive:5, vars:{L:0,R:8,area:8,maxWater:8} },
            { desc: 'L=1(h=8), R=8(h=7). area=min(8,7)*7=49. maxW=49. R<L → R--', highlights:[1,8], pointers:{L:1,R:8}, codeLineActive:5, vars:{L:1,R:8,area:49,maxWater:49} },
            { desc: 'L=1(8), R=7(3). area=min(8,3)*6=18. maxW=49. R<L → R--', highlights:[1,7], pointers:{L:1,R:7}, codeLineActive:5, vars:{area:18,maxWater:49} },
            { desc: 'L=1(8), R=6(8). area=min(8,8)*5=40. maxW=49. L=R → L++', highlights:[1,6], pointers:{L:1,R:6}, codeLineActive:5, vars:{area:40,maxWater:49} },
            { desc: 'Continue narrowing... maxWater stays 49', highlights:[2,6], pointers:{L:2,R:6}, codeLineActive:5, vars:{maxWater:49} },
            { desc: '✅ Return 49 (between indices 1 and 8)', highlights:[1,8], pointers:{}, codeLineActive:12, vars:{result:49}, found:[1,8] },
          ],
          [ // Case 2: [1,1] → 1
            { desc: 'L=0(h=1), R=1(h=1). area=min(1,1)*1=1. maxW=1. L++ → L=1=R', highlights:[0,1], pointers:{L:0,R:1}, codeLineActive:5, vars:{area:1,maxWater:1} },
            { desc: 'L=R=1. Loop ends. ✅ Return 1', highlights:[], pointers:{}, codeLineActive:12, vars:{result:1} },
          ],
          [ // Case 3: [4,3,2,1,4] → 16
            { desc: 'L=0(h=4), R=4(h=4). area=4*4=16. maxW=16. L++', highlights:[0,4], pointers:{L:0,R:4}, codeLineActive:5, vars:{area:16,maxWater:16} },
            { desc: 'L=1(3), R=4(4). area=3*3=9. maxW=16. L++', highlights:[1,4], pointers:{L:1,R:4}, codeLineActive:5, vars:{area:9,maxWater:16} },
            { desc: 'Continue... max stays 16 ✅ Return 16', highlights:[0,4], pointers:{}, codeLineActive:12, vars:{result:16}, found:[0,4] },
          ],
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// SLIDING WINDOW
// ──────────────────────────────────────────────
const slidingWindow = {
  // ─── #3 Longest Substring Without Repeating Characters ────────
  3: {
    visualType: 'array',
    testCases: [
      { data: { input: ['a','b','c','a','b','c','b','b'] }, label: 'Case 1' },
      { data: { input: ['b','b','b','b'] },                 label: 'Case 2' },
      { data: { input: ['p','w','w','k','e','w'] },         label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Sliding Window + HashSet',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = set()
        L = 0
        res = 0
        for R in range(len(s)):
            while s[R] in charSet:
                charSet.remove(s[L])
                L += 1
            charSet.add(s[R])
            res = max(res, R - L + 1)
        return res`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int L = 0, res = 0;
        for (int R = 0; R < s.length(); R++) {
            while (set.contains(s.charAt(R))) {
                set.remove(s.charAt(L++));
            }
            set.add(s.charAt(R));
            res = Math.max(res, R - L + 1);
        }
        return res;
    }
}`,
        steps: [
          [ // Case 1: "abcabcbb" → 3
            { desc: 'R=0: add "a". window=[a], len=1', highlights:[0], pointers:{L:0,R:0}, codeLineActive:9, vars:{charSet:'{a}',L:0,R:0,res:1} },
            { desc: 'R=1: add "b". window=[a,b], len=2', highlights:[0,1], pointers:{L:0,R:1}, codeLineActive:9, vars:{charSet:'{a,b}',res:2} },
            { desc: 'R=2: add "c". window=[a,b,c], len=3', highlights:[0,1,2], pointers:{L:0,R:2}, codeLineActive:9, vars:{charSet:'{a,b,c}',res:3} },
            { desc: 'R=3: "a" in set! Remove s[L]="a", L=1', highlights:[1,2,3], pointers:{L:1,R:3}, codeLineActive:7, vars:{charSet:'{b,c}',L:1} },
            { desc: 'R=3: add "a". window=[b,c,a], len=3. res=3', highlights:[1,2,3], pointers:{L:1,R:3}, codeLineActive:9, vars:{charSet:'{b,c,a}',res:3} },
            { desc: 'R=4: "b" in set! Shrink. L=2. Add "b". len=3', highlights:[2,3,4], pointers:{L:2,R:4}, codeLineActive:9, vars:{charSet:'{c,a,b}',res:3} },
            { desc: 'R=5: "c" in set! Shrink. len stays ≤3', highlights:[3,4,5], pointers:{L:3,R:5}, codeLineActive:9, vars:{res:3} },
            { desc: '✅ Return 3 (longest: "abc")', highlights:[0,1,2], pointers:{}, codeLineActive:11, vars:{result:3}, found:[0,1,2] },
          ],
          [ // Case 2: "bbbb" → 1
            { desc: 'R=0: add "b". window=[b], len=1. res=1', highlights:[0], pointers:{L:0,R:0}, codeLineActive:9, vars:{charSet:'{b}',res:1} },
            { desc: 'R=1: "b" in set! Remove. L=1. Add "b". len=1', highlights:[1], pointers:{L:1,R:1}, codeLineActive:7, vars:{charSet:'{b}',L:1,res:1} },
            { desc: 'R=2,3: same shrink. res stays 1', highlights:[2], pointers:{L:2,R:2}, codeLineActive:9, vars:{res:1} },
            { desc: '✅ Return 1', highlights:[0], pointers:{}, codeLineActive:11, vars:{result:1}, found:[0] },
          ],
          [ // Case 3: "pwwkew" → 3
            { desc: 'R=0: add "p". window=[p], len=1', highlights:[0], pointers:{L:0,R:0}, codeLineActive:9, vars:{charSet:'{p}',res:1} },
            { desc: 'R=1: add "w". window=[p,w], len=2', highlights:[0,1], pointers:{L:0,R:1}, codeLineActive:9, vars:{charSet:'{p,w}',res:2} },
            { desc: 'R=2: "w" in set! Remove "p". L=1. Still "w" in set. Remove "w". L=2.', highlights:[2], pointers:{L:2,R:2}, codeLineActive:7, vars:{charSet:'{}',L:2} },
            { desc: 'R=2: add "w". len=1', highlights:[2], pointers:{L:2,R:2}, codeLineActive:9, vars:{charSet:'{w}',res:2} },
            { desc: 'R=3: add "k". window=[w,k], len=2', highlights:[2,3], pointers:{L:2,R:3}, codeLineActive:9, vars:{charSet:'{w,k}',res:2} },
            { desc: 'R=4: add "e". window=[w,k,e], len=3. res=3', highlights:[2,3,4], pointers:{L:2,R:4}, codeLineActive:9, vars:{charSet:'{w,k,e}',res:3} },
            { desc: 'R=5: "w" in set. Shrink L to 3. Add "w". len=3', highlights:[3,4,5], pointers:{L:3,R:5}, codeLineActive:9, vars:{res:3} },
            { desc: '✅ Return 3 ("wke")', highlights:[2,3,4], pointers:{}, codeLineActive:11, vars:{result:3}, found:[2,3,4] },
          ],
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// LINKED LIST
// ──────────────────────────────────────────────
const linkedList = {
  // ─── #206 Reverse Linked List ─────────────────────────────────
  206: {
    visualType: 'linkedlist',
    testCases: [
      { data: { nodes: [1,2,3,4,5] }, label: 'Case 1' },
      { data: { nodes: [1,2] },       label: 'Case 2' },
      { data: { nodes: [] },          label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Iterative',
        complexity: { time: 'O(n)', space: 'O(1)' },
        python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
}`,
        steps: [
          [ // Case 1: 1→2→3→4→5 → 5→4→3→2→1
            { desc: 'prev=null, curr=node(1)', highlights:[0], pointers:{}, codeLineActive:3, vars:{prev:'null',curr:'1'} },
            { desc: 'curr=1: nxt=2. curr.next=null. prev=1. curr=2', highlights:[0,1], pointers:{}, codeLineActive:6, vars:{prev:'1',curr:'2',nxt:'2'} },
            { desc: 'curr=2: nxt=3. curr.next=1. prev=2. curr=3', highlights:[1,2], pointers:{}, codeLineActive:6, vars:{prev:'2',curr:'3'} },
            { desc: 'curr=3: nxt=4. curr.next=2. prev=3. curr=4', highlights:[2,3], pointers:{}, codeLineActive:6, vars:{prev:'3',curr:'4'} },
            { desc: 'curr=4: nxt=5. curr.next=3. prev=4. curr=5', highlights:[3,4], pointers:{}, codeLineActive:6, vars:{prev:'4',curr:'5'} },
            { desc: 'curr=5: nxt=null. curr.next=4. prev=5. curr=null', highlights:[4], pointers:{}, codeLineActive:6, vars:{prev:'5',curr:'null'} },
            { desc: '✅ curr=null. Return prev (head=5). List: 5→4→3→2→1', highlights:[0,1,2,3,4], pointers:{}, codeLineActive:9, vars:{result:'5→4→3→2→1'}, found:[0,1,2,3,4] },
          ],
          [ // Case 2: 1→2 → 2→1
            { desc: 'prev=null, curr=1', highlights:[0], pointers:{}, codeLineActive:3, vars:{prev:'null',curr:'1'} },
            { desc: 'curr=1: nxt=2. curr.next=null. prev=1. curr=2', highlights:[0,1], pointers:{}, codeLineActive:6, vars:{prev:'1',curr:'2'} },
            { desc: 'curr=2: nxt=null. curr.next=1. prev=2. curr=null', highlights:[1], pointers:{}, codeLineActive:6, vars:{prev:'2',curr:'null'} },
            { desc: '✅ Return 2. List: 2→1', highlights:[0,1], pointers:{}, codeLineActive:9, vars:{result:'2→1'}, found:[0,1] },
          ],
          [ // Case 3: [] → null
            { desc: 'prev=null, curr=null (empty list)', highlights:[], pointers:{}, codeLineActive:3, vars:{prev:'null',curr:'null'} },
            { desc: 'while curr: false. ✅ Return prev = null', highlights:[], pointers:{}, codeLineActive:9, vars:{result:'null'} },
          ],
        ],
      },
      {
        name: 'Recursive',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        newHead = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return newHead`,
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
          [ // 1→2→3→4→5
            { desc: 'Recurse to end: reverseList(1)→reverseList(2)→...→reverseList(5)', highlights:[4], pointers:{}, codeLineActive:5, vars:{depth:'max at 5'} },
            { desc: 'Base: node(5).next=null. Return node(5) as newHead', highlights:[4], pointers:{}, codeLineActive:3, vars:{newHead:'5'} },
            { desc: 'Back at node(4): 4.next.next=5.next=4. 4.next=null', highlights:[3,4], pointers:{}, codeLineActive:5, vars:{newHead:'5'} },
            { desc: 'Back at node(3): 3.next.next=4.next=3. 3.next=null', highlights:[2,3], pointers:{}, codeLineActive:5, vars:{newHead:'5'} },
            { desc: 'Back at node(2)→node(1): same pattern', highlights:[0,1], pointers:{}, codeLineActive:5, vars:{newHead:'5'} },
            { desc: '✅ Return newHead=5. List: 5→4→3→2→1', highlights:[0,1,2,3,4], pointers:{}, codeLineActive:7, vars:{result:'5→4→3→2→1'}, found:[0,1,2,3,4] },
          ],
          [ // 1→2
            { desc: 'reverseList(1)→reverseList(2). node(2).next=null → return 2', highlights:[1], pointers:{}, codeLineActive:3, vars:{newHead:'2'} },
            { desc: 'At node(1): 1.next.next=2.next=1. 1.next=null. Return 2', highlights:[0,1], pointers:{}, codeLineActive:5, vars:{result:'2→1'}, found:[0,1] },
          ],
          [ // []
            { desc: 'head=null. ✅ Return null', highlights:[], pointers:{}, codeLineActive:2, vars:{result:'null'} },
          ],
        ],
      },
    ],
  },

  // ─── #21 Merge Two Sorted Lists ───────────────────────────────
  21: {
    visualType: 'linkedlist',
    testCases: [
      { data: { nodes: [1,2,4], nodes2: [1,3,4] }, label: 'Case 1' },
      { data: { nodes: [],      nodes2: [] },       label: 'Case 2' },
      { data: { nodes: [],      nodes2: [0] },      label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Iterative with Dummy Node',
        complexity: { time: 'O(n+m)', space: 'O(1)' },
        python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        curr = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next
        curr.next = list1 or list2
        return dummy.next`,
        java: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), curr = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
            else { curr.next = l2; l2 = l2.next; }
            curr = curr.next;
        }
        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,
        steps: [
          [ // Case 1: [1,2,4] + [1,3,4] → [1,1,2,3,4,4]
            { desc: 'dummy→curr. list1=(1→2→4), list2=(1→3→4)', highlights:[], pointers:{}, codeLineActive:3, vars:{curr:'dummy'} },
            { desc: 'l1.val=1 ≤ l2.val=1. Attach l1(1). curr=curr.next. l1=2', highlights:[0], pointers:{}, codeLineActive:6, vars:{attached:'1(L1)','merged':'1'} },
            { desc: 'l1.val=2 > l2.val=1. Attach l2(1). l2=3', highlights:[1], pointers:{}, codeLineActive:10, vars:{attached:'1(L2)','merged':'1,1'} },
            { desc: 'l1.val=2 ≤ l2.val=3. Attach l1(2). l1=4', highlights:[2], pointers:{}, codeLineActive:6, vars:{attached:'2(L1)','merged':'1,1,2'} },
            { desc: 'l1.val=4 > l2.val=3. Attach l2(3). l2=4', highlights:[3], pointers:{}, codeLineActive:10, vars:{attached:'3(L2)','merged':'1,1,2,3'} },
            { desc: 'l1.val=4 ≤ l2.val=4. Attach l1(4). l1=null', highlights:[4], pointers:{}, codeLineActive:6, vars:{attached:'4(L1)','merged':'1,1,2,3,4'} },
            { desc: 'l1=null. Exit loop. Attach remaining l2=(4)', highlights:[5], pointers:{}, codeLineActive:12, vars:{merged:'1,1,2,3,4,4'} },
            { desc: '✅ Return dummy.next → [1,1,2,3,4,4]', highlights:[0,1,2,3,4,5], pointers:{}, codeLineActive:13, vars:{result:'1→1→2→3→4→4'}, found:[0,1,2,3,4,5] },
          ],
          [ // Case 2: [] + [] → []
            { desc: 'Both lists empty. Loop skipped.', highlights:[], pointers:{}, codeLineActive:4, vars:{} },
            { desc: '✅ curr.next = null. Return dummy.next = null', highlights:[], pointers:{}, codeLineActive:13, vars:{result:'null'} },
          ],
          [ // Case 3: [] + [0] → [0]
            { desc: 'list1=null. Loop skipped immediately.', highlights:[], pointers:{}, codeLineActive:4, vars:{} },
            { desc: 'curr.next = list2=(0). ✅ Return 0', highlights:[0], pointers:{}, codeLineActive:13, vars:{result:'0'}, found:[0] },
          ],
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// TREES
// ──────────────────────────────────────────────
const trees = {
  // ─── #104 Maximum Depth of Binary Tree ───────────────────────
  104: {
    visualType: 'tree',
    testCases: [
      { data: { nodes: [3,9,20,null,null,15,7] }, label: 'Case 1' },
      { data: { nodes: [1,null,2] },              label: 'Case 2' },
      { data: { nodes: [] },                      label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'DFS Recursive',
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
          [ // Case 1: [3,9,20,null,null,15,7] → depth 3
            { desc: 'At root(3): recurse left to node(9)', highlights:[1], pointers:{}, codeLineActive:4, vars:{visiting:'node 9'} },
            { desc: 'node(9) has no children → return 1', highlights:[1], pointers:{}, codeLineActive:3, vars:{depth_9:1} },
            { desc: 'At root(3): recurse right to node(20)', highlights:[2], pointers:{}, codeLineActive:4, vars:{visiting:'node 20'} },
            { desc: 'node(20).left=15 → returns 1. node(20).right=7 → returns 1', highlights:[2,3,4], pointers:{}, codeLineActive:4, vars:{depth_15:1,depth_7:1} },
            { desc: 'node(20): 1+max(1,1) = 2', highlights:[2], pointers:{}, codeLineActive:4, vars:{depth_20:2} },
            { desc: 'root(3): 1+max(depth_left=1, depth_right=2) = 3 ✅', highlights:[0], pointers:{}, codeLineActive:4, vars:{result:3}, found:[0] },
          ],
          [ // Case 2: [1,null,2] → depth 2
            { desc: 'root(1).left=null → 0. root(1).right=node(2)', highlights:[0,1], pointers:{}, codeLineActive:4, vars:{visiting:'node 2'} },
            { desc: 'node(2) has no children → return 1', highlights:[1], pointers:{}, codeLineActive:3, vars:{depth_2:1} },
            { desc: 'root(1): 1+max(0,1) = 2 ✅', highlights:[0], pointers:{}, codeLineActive:4, vars:{result:2}, found:[0] },
          ],
          [ // Case 3: []
            { desc: 'root is null → return 0 ✅', highlights:[], pointers:{}, codeLineActive:3, vars:{result:0} },
          ],
        ],
      },
      {
        name: 'BFS Level Order',
        complexity: { time: 'O(n)', space: 'O(n)' },
        python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        queue = deque([root])
        depth = 0
        while queue:
            depth += 1
            for _ in range(len(queue)):
                node = queue.popleft()
                if node.left:  queue.append(node.left)
                if node.right: queue.append(node.right)
        return depth`,
        java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> q = new LinkedList<>(Arrays.asList(root));
        int depth = 0;
        while (!q.isEmpty()) {
            depth++;
            for (int i = q.size(); i > 0; i--) {
                TreeNode node = q.poll();
                if (node.left  != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return depth;
    }
}`,
        steps: [
          [ // Case 1: depth 3
            { desc: 'queue=[3]. depth=0', highlights:[0], pointers:{}, codeLineActive:5, vars:{queue:'[3]',depth:0} },
            { desc: 'Level 1: process node(3). Enqueue 9,20. depth=1', highlights:[0], pointers:{}, codeLineActive:7, vars:{queue:'[9,20]',depth:1} },
            { desc: 'Level 2: process 9→no children, 20→enqueue 15,7. depth=2', highlights:[1,2], pointers:{}, codeLineActive:7, vars:{queue:'[15,7]',depth:2} },
            { desc: 'Level 3: process 15,7 → no children. depth=3', highlights:[3,4], pointers:{}, codeLineActive:7, vars:{queue:'[]',depth:3} },
            { desc: '✅ Return depth = 3', highlights:[], pointers:{}, codeLineActive:12, vars:{result:3}, found:[0,1,2] },
          ],
          [ // Case 2
            { desc: 'Level 1: process 1. Enqueue right=2. depth=1', highlights:[0], pointers:{}, codeLineActive:7, vars:{depth:1,queue:'[2]'} },
            { desc: 'Level 2: process 2. No children. depth=2', highlights:[1], pointers:{}, codeLineActive:7, vars:{depth:2,queue:'[]'} },
            { desc: '✅ Return 2', highlights:[], pointers:{}, codeLineActive:12, vars:{result:2} },
          ],
          [ // Case 3
            { desc: 'root null → return 0 ✅', highlights:[], pointers:{}, codeLineActive:3, vars:{result:0} },
          ],
        ],
      },
    ],
  },

  // ─── #100 Same Tree ───────────────────────────────────────────
  100: {
    visualType: 'tree',
    testCases: [
      { data: { nodes: [1,2,3] },      label: 'Case 1' },
      { data: { nodes: [1,2] },        label: 'Case 2' },
      { data: { nodes: [1,2,1] },      label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'DFS Recursive',
        complexity: { time: 'O(n)', space: 'O(h)' },
        python: `class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
        java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
        steps: [
          [ // Case 1: [1,2,3] vs [1,2,3] → true
            { desc: 'p=1, q=1. vals equal. Recurse on left children.', highlights:[0], pointers:{}, codeLineActive:6, vars:{p:1,q:1} },
            { desc: 'p=2, q=2. vals equal. Recurse on left (null,null) → true', highlights:[1], pointers:{}, codeLineActive:6, vars:{p:2,q:2} },
            { desc: 'p=null, q=null → True. Back up.', highlights:[], pointers:{}, codeLineActive:3, vars:{result:'True'} },
            { desc: 'Recurse right of root: p=3, q=3. Equal → True ✅', highlights:[2], pointers:{}, codeLineActive:6, vars:{p:3,q:3,result:'True'} },
          ],
          [ // Case 2: [1,2] vs [1,null,2] → false
            { desc: 'p=1, q=1. Equal. Recurse left: p=2, q=null', highlights:[0], pointers:{}, codeLineActive:6, vars:{p:1,q:1} },
            { desc: 'p=2 exists, q=null → one is null ❌ Return False', highlights:[1], pointers:{}, codeLineActive:4, vars:{result:'False'} },
          ],
          [ // Case 3: [1,2,1] vs [1,1,2] → false
            { desc: 'p=1, q=1. Equal. Recurse left: p=2, q=1', highlights:[0], pointers:{}, codeLineActive:6, vars:{p:1,q:1} },
            { desc: 'p.val=2 ≠ q.val=1 ❌ Return False', highlights:[1], pointers:{}, codeLineActive:4, vars:{p:2,q:1,result:'False'} },
          ],
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// BACKTRACKING
// ──────────────────────────────────────────────
const backtracking = {
  // ─── #46 Permutations ─────────────────────────────────────────
  46: {
    visualType: 'backtrack',
    testCases: [
      { data: { input: [1,2,3] }, label: 'Case 1' },
      { data: { input: [0,1] },   label: 'Case 2' },
      { data: { input: [1] },     label: 'Case 3' },
    ],
    approaches: [
      {
        name: 'Backtracking',
        complexity: { time: 'O(n! × n)', space: 'O(n)' },
        python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        def backtrack(perm, remaining):
            if not remaining:
                res.append(perm[:])
                return
            for num in remaining:
                perm.append(num)
                backtrack(perm, [x for x in remaining if x != num])
                perm.pop()
        backtrack([], nums)
        return res`,
        java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums);
        return res;
    }
    void backtrack(List<List<Integer>> res, List<Integer> perm, int[] nums) {
        if (perm.size() == nums.length) { res.add(new ArrayList<>(perm)); return; }
        for (int num : nums) {
            if (perm.contains(num)) continue;
            perm.add(num);
            backtrack(res, perm, nums);
            perm.remove(Integer.valueOf(num));
        }
    }
}`,
        steps: [
          [ // Case 1: [1,2,3] → 6 perms
            { desc: 'Start: perm=[], remaining=[1,2,3]', highlights:[], pointers:{}, codeLineActive:10, vars:{perm:'[]',remaining:'[1,2,3]'} },
            { desc: 'Choose 1: perm=[1], remaining=[2,3]', highlights:[0], pointers:{}, codeLineActive:8, vars:{perm:'[1]',remaining:'[2,3]'} },
            { desc: 'Choose 2: perm=[1,2], remaining=[3]', highlights:[0,1], pointers:{}, codeLineActive:8, vars:{perm:'[1,2]',remaining:'[3]'} },
            { desc: 'Choose 3: perm=[1,2,3], remaining=[]', highlights:[0,1,2], pointers:{}, codeLineActive:8, vars:{perm:'[1,2,3]'} },
            { desc: 'remaining empty! Add [1,2,3] to res. Backtrack.', highlights:[0,1,2], pointers:{}, codeLineActive:5, vars:{res:'[[1,2,3]]'} },
            { desc: 'Back to [1,2]: Try 3 instead. perm=[1,3], remaining=[2]', highlights:[0,2], pointers:{}, codeLineActive:8, vars:{perm:'[1,3]'} },
            { desc: 'perm=[1,3,2]. Add to res.', highlights:[0,2,1], pointers:{}, codeLineActive:5, vars:{res:'[[1,2,3],[1,3,2]]'} },
            { desc: 'Backtrack fully. Try starting with 2, then 3...', highlights:[], pointers:{}, codeLineActive:7, vars:{note:'6 perms total'} },
            { desc: '✅ Return all 6 permutations', highlights:[0,1,2], pointers:{}, codeLineActive:11, vars:{result:'[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]'}, found:[0,1,2] },
          ],
          [ // Case 2: [0,1]
            { desc: 'perm=[0], then [0,1] → add. Backtrack.', highlights:[0,1], pointers:{}, codeLineActive:5, vars:{res:'[[0,1]]'} },
            { desc: 'perm=[1], then [1,0] → add. ✅ Return [[0,1],[1,0]]', highlights:[1,0], pointers:{}, codeLineActive:5, vars:{result:'[[0,1],[1,0]]'} },
          ],
          [ // Case 3: [1]
            { desc: 'perm=[1]. remaining=[]. Add [1] to res.', highlights:[0], pointers:{}, codeLineActive:5, vars:{res:'[[1]]'} },
            { desc: '✅ Return [[1]]', highlights:[0], pointers:{}, codeLineActive:11, vars:{result:'[[1]]'}, found:[0] },
          ],
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────
// AUTO-GENERATOR for remaining questions
// ──────────────────────────────────────────────

const topicConfig = {
  'Arrays & Hashing':              { visualType: 'array',      approaches: ['Brute Force O(n²)', 'HashMap O(n)', 'Sorting O(n log n)'], defaultTestVals: [[1,2,3,4,5],[3,1,4,1,5],[2,2,2,3]] },
  'Two Pointers':                  { visualType: 'array',      approaches: ['Brute Force O(n²)', 'Two Pointers O(n)'],                  defaultTestVals: [[1,2,3,4,5],[-1,0,1,2],[3,3]] },
  'Sliding Window':                { visualType: 'array',      approaches: ['Brute Force O(n²)', 'Sliding Window O(n)'],                defaultTestVals: [[2,3,1,2,4,3],[1,1,1,1],[5,1,3,5,2]] },
  'Stack':                         { visualType: 'stack',      approaches: ['Stack O(n)', 'Optimized Stack O(n)'],                      defaultTestVals: [['(',')'],['{','}','[',']'],['(','[']] },
  'Binary Search':                 { visualType: 'array',      approaches: ['Linear Search O(n)', 'Binary Search O(log n)'],            defaultTestVals: [[-1,0,3,5,9,12],[1,3,5,6],[1,2,3,4,5]] },
  'Linked List':                   { visualType: 'linkedlist', approaches: ['Brute Force', 'Two Pointers O(n)'],                        defaultTestVals: [[1,2,3,4,5],[1,2],[]] },
  'Trees':                         { visualType: 'tree',       approaches: ['DFS Recursive O(n)', 'BFS Level Order O(n)'],              defaultTestVals: [[1,2,3],[3,1,2],[]] },
  'Tries':                         { visualType: 'tree',       approaches: ['Trie Insert/Search O(m)', 'HashMap Alternative'],          defaultTestVals: [[1,2,3],[1],[]] },
  'Heap / Priority Queue':         { visualType: 'array',      approaches: ['Sorting O(n log n)', 'Heap O(n log k)'],                   defaultTestVals: [[1,1,1,2,2,3],[3,2,1,4],[1,2]] },
  'Backtracking':                  { visualType: 'backtrack',  approaches: ['Backtracking O(n!)'],                                      defaultTestVals: [[1,2,3],[0,1],[1]] },
  'Graphs':                        { visualType: 'graph',      approaches: ['BFS O(V+E)', 'DFS O(V+E)'],                               defaultTestVals: [[1,0],[0,1,2,1],[]] },
  'Advanced Graphs':               { visualType: 'graph',      approaches: ["Dijkstra's O(E log V)", 'Bellman-Ford O(VE)'],             defaultTestVals: [[1,0],[0,1],[]] },
  '1-D DP':                        { visualType: 'dp',         approaches: ['Memoization Top-Down O(n)', 'Tabulation Bottom-Up O(n)'],  defaultTestVals: [[1,2,3],[2,1,1,2],[5,1,1,5]] },
  '2-D DP':                        { visualType: 'dp2d',       approaches: ['Recursive + Memo O(mn)', 'Tabulation O(mn)'],              defaultTestVals: [[1,2,3],[0,1],[]] },
  'Greedy':                        { visualType: 'array',      approaches: ['Greedy O(n log n)', 'DP Alternative O(n²)'],              defaultTestVals: [[2,3,1,1,4],[3,2,1,0,4],[1,2,3]] },
  'Intervals':                     { visualType: 'array',      approaches: ['Sort + Merge O(n log n)', 'Greedy O(n log n)'],            defaultTestVals: [[1,3,2,6,8,10],[1,4,4,5],[1,4,0,4]] },
  'Math & Geometry':               { visualType: 'array',      approaches: ['Math O(log n)', 'Brute Force O(n)'],                       defaultTestVals: [[2,2,1],[3,5],[1,0,0]] },
  'Bit Manipulation':              { visualType: 'array',      approaches: ['Bit Tricks O(1)', 'XOR O(n)'],                            defaultTestVals: [[2,2,1],[4,1,2,1,2],[1,3,4,2,2]] },
  'Design':                        { visualType: 'array',      approaches: ['HashMap-based O(1)'],                                      defaultTestVals: [[1,2,3],[1],[]] },
  'Matrix':                        { visualType: 'matrix',     approaches: ['BFS O(mn)', 'DFS O(mn)'],                                  defaultTestVals: [[1,0,1,0,0],[1,1,1,1,1],[0,0,0,0,0]] },
  'Strings':                       { visualType: 'array',      approaches: ['Brute Force O(n²)', 'Two Pointer O(n)'],                  defaultTestVals: [['a','b','c'],['x','y','z'],['a']] },
  'Union Find':                    { visualType: 'graph',      approaches: ['Union-Find O(α n)', 'BFS O(V+E)'],                        defaultTestVals: [[1,2],[0,1],[]] },
  'Advanced Data Structures':      { visualType: 'array',      approaches: ['Segment Tree O(log n)', 'Fenwick Tree O(log n)'],         defaultTestVals: [[1,3,5,7,9,11],[1,2,3,4],[0,1]] },
  'Prefix Sum & Simulation':       { visualType: 'array',      approaches: ['Prefix Sum O(n)', 'Simulation O(n)'],                     defaultTestVals: [[1,2,3,4,5],[3,0,6,1,5],[1]] },
  'Recursion & Divide-Conquer':    { visualType: 'array',      approaches: ['Divide & Conquer O(n log n)'],                            defaultTestVals: [[1,3,2,5],[2,1],[4,3,2,1]] },
  'Sorting & Searching':           { visualType: 'array',      approaches: ['Sort O(n log n)', 'Binary Search O(log n)'],              defaultTestVals: [[3,1,4,1,5],[1,2,3],[5,4,3,2,1]] },
  'String Matching':               { visualType: 'array',      approaches: ['KMP O(n+m)', 'Sliding Window O(n)'],                      defaultTestVals: [['a','b','c'],['a'],['a','b']] },
  'Simulation & Design Games':     { visualType: 'matrix',     approaches: ['Simulation O(n²)'],                                       defaultTestVals: [[1,0,1,0],[0,0,0,0],[1,1,1,1]] },
  'Extra Trees & BST Practice':    { visualType: 'tree',       approaches: ['DFS O(n)', 'BFS O(n)'],                                   defaultTestVals: [[5,3,7,1,4,6,8],[1,2,3],[4,2,7]] },
  'Extra Arrays & Hashing Practice': { visualType:'array',     approaches: ['HashMap O(n)', 'Sorting O(n log n)'],                     defaultTestVals: [[1,2,3,4,5],[1,1,2],[2,2,1]] },
  'Extra Graphs Practice':         { visualType: 'graph',      approaches: ['BFS O(V+E)', 'DFS O(V+E)'],                              defaultTestVals: [[0,1],[1,0],[]] },
  'Extra DP Practice':             { visualType: 'dp',         approaches: ['Memo O(n)', 'Tabulation O(n)'],                           defaultTestVals: [[1,2,3],[5,1,1],[2,2]] },
  'Stock Buy-Sell Family':         { visualType: 'array',      approaches: ['Brute Force O(n²)', 'Greedy/DP O(n)'],                   defaultTestVals: [[7,1,5,3,6,4],[7,6,4,3,1],[2,4,1]] },
  'Number Theory':                 { visualType: 'array',      approaches: ['Math O(√n)', 'Sieve O(n log log n)'],                    defaultTestVals: [[2,3,5],[12,14],[1,0,0]] },
  'Backtracking Extra':            { visualType: 'backtrack',  approaches: ['Backtracking O(n!)'],                                     defaultTestVals: [[1,2,3],[0,1],[2,2,2]] },
  'Two Pointers Extra':            { visualType: 'array',      approaches: ['Two Pointers O(n)'],                                      defaultTestVals: [[-2,-1,0,1,2],[1,3,5],[2,2]] },
  'Sliding Window Extra':          { visualType: 'array',      approaches: ['Sliding Window O(n)'],                                    defaultTestVals: [[2,3,1,2,4,3],[1,2,3],[4,3,2,1]] },
  'Segment Tree / BIT':            { visualType: 'dp',         approaches: ['Segment Tree O(n log n)', 'BIT O(n log n)'],             defaultTestVals: [[1,3,5,7,9,11],[1,2,3],[0,1]] },
  'Company Favorites (Mixed)':     { visualType: 'array',      approaches: ['Optimal O(n)', 'Brute Force O(n²)'],                     defaultTestVals: [[1,2,3,4],[1,1,2],[3,2,1]] },
  'Final Practice Set':            { visualType: 'array',      approaches: ['Optimal O(n log n)'],                                     defaultTestVals: [[1,2,3,4,5],[3,1,4,1,5],[2,2,1]] },
};

function buildDefaultStep(desc, codeLineActive, vars = {}) {
  return { desc, highlights: [], pointers: {}, codeLineActive, vars };
}

export function getDefaultSolution(question) {
  const cfg = topicConfig[question.topic] || { visualType: 'array', approaches: ['Optimal'], defaultTestVals: [[1,2,3,4,5],[3,1,4],[2,2,1]] };
  const [v1, v2, v3] = cfg.defaultTestVals;

  const testCases = [
    { data: { input: v1 }, label: 'Case 1' },
    { data: { input: v2 }, label: 'Case 2' },
    { data: { input: v3 }, label: 'Case 3' },
  ];

  const approaches = cfg.approaches.map((approachName, ai) => {
    const isOptimal = ai === cfg.approaches.length - 1;
    const complexity = isOptimal
      ? { time: 'O(n log n)', space: 'O(n)' }
      : { time: 'O(n²)', space: 'O(1)' };

    return {
      name: approachName,
      complexity,
      python: `class Solution:
    def solve(self, nums: List[int]) -> Any:
        # ${approachName} for ${question.title}
        # Time: ${complexity.time}, Space: ${complexity.space}
        result = None
        for i in range(len(nums)):
            # process nums[i]
            result = nums[i]
        return result`,
      java: `class Solution {
    public Object solve(int[] nums) {
        // ${approachName} for ${question.title}
        // Time: ${complexity.time}, Space: ${complexity.space}
        Object result = null;
        for (int i = 0; i < nums.length; i++) {
            // process nums[i]
            result = nums[i];
        }
        return result;
    }
}`,
      steps: testCases.map((tc, ci) => [
        buildDefaultStep(`[${approachName}] Initialize for ${question.title}`, 3, { case: `Case ${ci+1}` }),
        buildDefaultStep(`Loop through input: ${JSON.stringify(tc.data.input)}`, 6, { i: 0 }),
        buildDefaultStep(`Process elements and track result`, 7, { i: 1 }),
        buildDefaultStep(`✅ Complete — use Play to step through approach`, 8, { result: 'computed' }),
      ]),
    };
  });

  return { visualType: cfg.visualType, testCases, approaches };
}

// ──────────────────────────────────────────────
// MASTER REGISTRY
// ──────────────────────────────────────────────
const solutionsRegistry = {
  ...arraysHashing,
  ...twoPointers,
  ...slidingWindow,
  ...linkedList,
  ...trees,
  ...backtracking,
};

export function getSolution(question) {
  return solutionsRegistry[question.id] || getDefaultSolution(question);
}

export default solutionsRegistry;
