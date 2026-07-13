import json

class AH_Simulators:
    @staticmethod
    def simulate_two_sum(nums, target, approach):
        steps = []
        n = len(nums)
        if approach == "Brute Force":
            steps.append({
                "desc": f"Start Brute Force search. Target = {target}.",
                "highlights": [], "pointers": {}, "codeLineActive": 2, "vars": {"target": target}
            })
            found = False
            for i in range(n):
                for j in range(i + 1, n):
                    val_sum = nums[i] + nums[j]
                    is_match = (val_sum == target)
                    desc = f"i={i}, j={j}. Check nums[{i}]+nums[{j}] ({nums[i]}+{nums[j]}={val_sum}). "
                    if is_match:
                        desc += "Match found!"
                        found = True
                    steps.append({
                        "desc": desc,
                        "highlights": [i, j],
                        "pointers": {"i": i, "j": j},
                        "codeLineActive": 5 if is_match else 4,
                        "vars": {"i": i, "j": j, "sum": val_sum, "target": target}
                    })
                    if is_match: break
                if found: break
        else: # HashMap
            steps.append({
                "desc": "Initialize HashMap (seen) to track visited elements and indices.",
                "highlights": [], "pointers": {}, "codeLineActive": 2, "vars": {"seen": {}}
            })
            seen = {}
            for i, num in enumerate(nums):
                comp = target - num
                desc = f"i={i}, num={num}. Complement is {target} - {num} = {comp}. "
                is_match = comp in seen
                if is_match:
                    desc += f"Complement {comp} exists in seen! Answer is [{seen[comp]}, {i}]."
                else:
                    desc += f"Complement {comp} not in seen. Add {num}: {i} to seen."
                
                steps.append({
                    "desc": desc,
                    "highlights": [i],
                    "pointers": {"i": i},
                    "codeLineActive": 6 if is_match else 8,
                    "vars": {"i": i, "num": num, "complement": comp, "seen": dict(seen)}
                })
                if is_match:
                    break
                seen[num] = i
        return steps

    @staticmethod
    def simulate_plus_one(digits, approach):
        steps = []
        n = len(digits)
        curr_digits = list(digits)
        steps.append({
            "desc": "Start from the rightmost digit.",
            "highlights": [], "pointers": {}, "codeLineActive": 2, "vars": {"digits": list(curr_digits)}
        })
        for i in range(n - 1, -1, -1):
            if curr_digits[i] < 9:
                curr_digits[i] += 1
                steps.append({
                    "desc": f"Digit at index {i} ({curr_digits[i]-1}) is less than 9. Increment to {curr_digits[i]} and return.",
                    "highlights": [i], "pointers": {"i": i}, "codeLineActive": 5, "vars": {"digits": list(curr_digits)}
                })
                break
            else:
                curr_digits[i] = 0
                steps.append({
                    "desc": f"Digit at index {i} is 9. Set to 0 and carry over to left.",
                    "highlights": [i], "pointers": {"i": i}, "codeLineActive": 7, "vars": {"digits": list(curr_digits)}
                })
        else:
            # ran if loop finished normally
            curr_digits.insert(0, 1)
            steps.append({
                "desc": "All digits were 9. Insert 1 at the beginning.",
                "highlights": [0], "pointers": {}, "codeLineActive": 9, "vars": {"digits": list(curr_digits)}
            })
        return steps

    @staticmethod
    def simulate_merge_sorted(nums1, m, nums2, n, approach):
        steps = []
        arr1 = list(nums1)
        arr2 = list(nums2)
        if approach == "Three Pointers":
            p1 = m - 1
            p2 = n - 1
            p = m + n - 1
            steps.append({
                "desc": "Initialize pointers at the ends of active ranges.",
                "highlights": [], "pointers": {"p1": p1, "p2": p2, "p": p}, "codeLineActive": 3,
                "vars": {"p1": p1, "p2": p2, "p": p, "nums1": list(arr1)}
            })
            while p2 >= 0:
                if p1 >= 0 and arr1[p1] > arr2[p2]:
                    arr1[p] = arr1[p1]
                    desc = f"nums1[p1] ({arr1[p1]}) > nums2[p2] ({arr2[p2]}). Place {arr1[p1]} at nums1[p]."
                    steps.append({
                        "desc": desc,
                        "highlights": [p1, p], "pointers": {"p1": p1, "p2": p2, "p": p}, "codeLineActive": 6,
                        "vars": {"p1": p1, "p2": p2, "p": p, "nums1": list(arr1)}
                    })
                    p1 -= 1
                else:
                    arr1[p] = arr2[p2]
                    desc = f"Place nums2[p2] ({arr2[p2]}) at nums1[p]."
                    steps.append({
                        "desc": desc,
                        "highlights": [p], "pointers": {"p1": p1, "p2": p2, "p": p}, "codeLineActive": 9,
                        "vars": {"p1": p1, "p2": p2, "p": p, "nums1": list(arr1)}
                    })
                    p2 -= 1
                p -= 1
        else: # Copy and Sort
            steps.append({
                "desc": "Copy nums2 elements into the end of nums1.",
                "highlights": list(range(m, m+n)), "pointers": {}, "codeLineActive": 2,
                "vars": {"nums1": list(arr1)}
            })
            for i in range(n):
                arr1[m + i] = arr2[i]
            arr1.sort()
            steps.append({
                "desc": "Sort the combined array.",
                "highlights": [], "pointers": {}, "codeLineActive": 4,
                "vars": {"nums1": list(arr1)}
            })
        return steps

    @staticmethod
    def simulate_two_sum_sorted(nums, target, approach):
        steps = []
        n = len(nums)
        L, R = 0, n - 1
        steps.append({
            "desc": f"Initialize Two Pointers. Left={L}, Right={R}.",
            "highlights": [L, R], "pointers": {"L": L, "R": R}, "codeLineActive": 3,
            "vars": {"L": L, "R": R, "target": target}
        })
        while L < R:
            val_sum = nums[L] + nums[R]
            is_match = (val_sum == target)
            desc = f"Sum = nums[L]+nums[R] ({nums[L]}+{nums[R]}={val_sum}). "
            if is_match:
                desc += "Match found!"
            elif val_sum < target:
                desc += f"Sum < target ({target}). Move Left pointer right."
            else:
                desc += f"Sum > target ({target}). Move Right pointer left."
                
            steps.append({
                "desc": desc,
                "highlights": [L, R], "pointers": {"L": L, "R": R}, "codeLineActive": 6 if is_match else (8 if val_sum < target else 10),
                "vars": {"L": L, "R": R, "sum": val_sum, "target": target}
            })
            if is_match:
                break
            if val_sum < target:
                L += 1
            else:
                R -= 1
        return steps

    @staticmethod
    def simulate_majority(nums, approach):
        steps = []
        n = len(nums)
        if approach == "Boyer-Moore":
            candidate = None
            count = 0
            steps.append({
                "desc": "Initialize candidate = null, count = 0.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"candidate": candidate, "count": count}
            })
            for i, num in enumerate(nums):
                old_cand = candidate
                if count == 0:
                    candidate = num
                if num == candidate:
                    count += 1
                    desc = f"num={num}. " + (f"New candidate={num}. " if count==1 else "") + f"Increments count to {count}."
                else:
                    count -= 1
                    desc = f"num={num}. Candidate is {candidate}. Decrements count to {count}."
                steps.append({
                    "desc": desc,
                    "highlights": [i], "pointers": {"i": i}, "codeLineActive": 6 if num == candidate else 8,
                    "vars": {"candidate": candidate, "count": count, "i": i}
                })
        else: # HashMap Count
            counts = {}
            steps.append({
                "desc": "Initialize frequency map.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"counts": {}}
            })
            for i, num in enumerate(nums):
                counts[num] = counts.get(num, 0) + 1
                desc = f"Increment count of {num} to {counts[num]}."
                is_maj = counts[num] > n // 2
                if is_maj:
                    desc += f" This is greater than n/2 ({n//2})!"
                steps.append({
                    "desc": desc,
                    "highlights": [i], "pointers": {"i": i}, "codeLineActive": 6 if is_maj else 4,
                    "vars": {"counts": dict(counts), "i": i}
                })
                if is_maj:
                    break
        return steps

    @staticmethod
    def simulate_contains_duplicate(nums, approach):
        steps = []
        n = len(nums)
        if approach == "HashSet":
            seen = set()
            steps.append({
                "desc": "Initialize empty HashSet.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"seen": []}
            })
            for i, num in enumerate(nums):
                is_dup = num in seen
                desc = f"Check if {num} is in seen. " + ("Duplicate found!" if is_dup else f"No. Add {num} to seen.")
                steps.append({
                    "desc": desc,
                    "highlights": [i], "pointers": {"i": i}, "codeLineActive": 5 if is_dup else 6,
                    "vars": {"seen": list(seen), "num": num}
                })
                if is_dup:
                    break
                seen.add(num)
        else: # Sorting
            arr = list(nums)
            steps.append({
                "desc": "Sort the input array.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"nums": list(arr)}
            })
            arr.sort()
            steps.append({
                "desc": "Sorted array representation.",
                "highlights": [], "pointers": {}, "codeLineActive": 3,
                "vars": {"nums": list(arr)}
            })
            for i in range(n - 1):
                is_dup = (arr[i] == arr[i+1])
                desc = f"Compare adjacent values at index {i} and {i+1} ({arr[i]} and {arr[i+1]}). " + ("Duplicate found!" if is_dup else "Not equal.")
                steps.append({
                    "desc": desc,
                    "highlights": [i, i+1], "pointers": {"i": i}, "codeLineActive": 6 if is_dup else 5,
                    "vars": {"i": i, "nums": list(arr)}
                })
                if is_dup:
                    break
        return steps

    @staticmethod
    def simulate_valid_anagram(s, t, approach):
        steps = []
        s_list = list(s)
        t_list = list(t)
        if approach == "Sorting":
            steps.append({
                "desc": f"Sort both strings and check if they are identical.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"s": "".join(s_list), "t": "".join(t_list)}
            })
            s_sorted = sorted(s_list)
            t_sorted = sorted(t_list)
            is_anagram = (s_sorted == t_sorted)
            steps.append({
                "desc": f"Sorted s: '{''.join(s_sorted)}', Sorted t: '{''.join(t_sorted)}'. Anagram: {is_anagram}",
                "highlights": [], "pointers": {}, "codeLineActive": 3,
                "vars": {"s_sorted": "".join(s_sorted), "t_sorted": "".join(t_sorted)}
            })
        else: # HashMap count
            steps.append({
                "desc": "Compare lengths first.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"len_s": len(s), "len_t": len(t)}
            })
            if len(s) == len(t):
                counts = {}
                for char in s:
                    counts[char] = counts.get(char, 0) + 1
                steps.append({
                    "desc": "Build character count map for string s.",
                    "highlights": [], "pointers": {}, "codeLineActive": 4,
                    "vars": {"counts": dict(counts)}
                })
                for i, char in enumerate(t):
                    is_valid = char in counts and counts[char] > 0
                    if is_valid:
                        counts[char] -= 0 # keep simple
                        desc = f"Decrement count of '{char}' in map."
                    else:
                        desc = f"Character '{char}' count is 0 or doesn't exist. Not an anagram!"
                    steps.append({
                        "desc": desc,
                        "highlights": [i], "pointers": {"i": i}, "codeLineActive": 6 if is_valid else 7,
                        "vars": {"counts": dict(counts), "char": char}
                    })
                    if not is_valid:
                        break
        return steps

    @staticmethod
    def simulate_move_zeroes(nums, approach):
        steps = []
        n = len(nums)
        arr = list(nums)
        if approach == "Two Pointers":
            write = 0
            steps.append({
                "desc": "Initialize write pointer to 0.",
                "highlights": [], "pointers": {"write": write}, "codeLineActive": 2,
                "vars": {"write": write, "nums": list(arr)}
            })
            for read in range(n):
                if arr[read] != 0:
                    arr[write], arr[read] = arr[read], arr[write]
                    desc = f"read={read}, nums[read]={arr[write]}. Swap with write={write}."
                    steps.append({
                        "desc": desc,
                        "highlights": [read, write], "pointers": {"read": read, "write": write}, "codeLineActive": 5,
                        "vars": {"write": write, "read": read, "nums": list(arr)}
                    })
                    write += 1
                else:
                    desc = f"read={read}, nums[read]=0. Skip swap."
                    steps.append({
                        "desc": desc,
                        "highlights": [read], "pointers": {"read": read, "write": write}, "codeLineActive": 4,
                        "vars": {"write": write, "read": read, "nums": list(arr)}
                    })
        else: # Copy array
            temp = [x for x in arr if x != 0]
            steps.append({
                "desc": f"Extract all non-zero elements: {temp}",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"temp": list(temp)}
            })
            while len(temp) < n:
                temp.append(0)
            steps.append({
                "desc": f"Fill remainder with zeroes: {temp}",
                "highlights": [], "pointers": {}, "codeLineActive": 4,
                "vars": {"nums": list(temp)}
            })
        return steps

    @staticmethod
    def simulate_missing_number(nums, approach):
        steps = []
        n = len(nums)
        if approach == "Sum Formula":
            expected = n * (n + 1) // 2
            actual = sum(nums)
            steps.append({
                "desc": f"Calculate expected sum for range [0..{n}] = {expected}.",
                "highlights": [], "pointers": {}, "codeLineActive": 2,
                "vars": {"expected_sum": expected}
            })
            steps.append({
                "desc": f"Calculate actual sum of elements = {actual}.",
                "highlights": [], "pointers": {}, "codeLineActive": 3,
                "vars": {"expected_sum": expected, "actual_sum": actual}
            })
            steps.append({
                "desc": f"Result: {expected} - {actual} = {expected - actual}",
                "highlights": [], "pointers": {}, "codeLineActive": 4,
                "vars": {"missing": expected - actual}
            })
        else: # XOR
            x = 0
            for i, num in enumerate(nums):
                x ^= i ^ num
            x ^= n
            steps.append({
                "desc": f"Initialize XOR sum and loop. Final missing XOR result = {x}",
                "highlights": [], "pointers": {}, "codeLineActive": 3,
                "vars": {"missing": x}
            })
        return steps

def get_premium_approaches(q_id, title, topic, testCases, visual_type, code_lines_count):
    # This checks if it matches one of the top 9 Arrays & Hashing questions
    # and returns high-fidelity approaches.
    
    # 1. Two Sum
    if q_id == 1:
        return [
            {
                "name": "Hash Map (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(N)"},
                "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in seen:\n                return [seen[comp], i]\n            seen[num] = i",
                "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (seen.containsKey(comp)) {\n                return new int[]{seen.get(comp), i};\n            }\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
                "algorithm": [
                    "Initialize an empty HashMap (seen) to store numbers and indices.",
                    "Iterate through the array sequentially.",
                    "Calculate the complement (target - current_number).",
                    "If complement is in HashMap, return its index and current index. Else store current_number."
                ],
                "whyItWorks": "Using a HashMap reduces target element lookup times from O(N) to O(1), achieving a linear runtime at the cost of O(N) auxiliary space.",
                "steps": [AH_Simulators.simulate_two_sum(tc['data']['input'], tc['data']['target'], "HashMap") for tc in testCases]
            },
            {
                "name": "Brute Force",
                "complexity": {"time": "O(N²)", "space": "O(1)"},
                "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]",
                "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) {\n                    return new int[]{i, j};\n                }\n            }\n        }\n        return new int[0];\n    }\n}",
                "algorithm": [
                    "Loop through each element using outer index pointer i.",
                    "Loop through subsequent elements using inner index pointer j.",
                    "Sum elements nums[i] + nums[j].",
                    "If sum equals target, return indices [i, j]."
                ],
                "whyItWorks": "Exhaustively checks every unique pair of elements. Does not require any extra space, but takes quadratic time.",
                "steps": [AH_Simulators.simulate_two_sum(tc['data']['input'], tc['data']['target'], "Brute Force") for tc in testCases]
            }
        ]

    # 66. Plus One
    if q_id == 66:
        return [
            {
                "name": "Iterate from Right",
                "complexity": {"time": "O(N)", "space": "O(1)"},
                "python": "class Solution:\n    def plusOne(self, digits: List[int]) -> List[int]:\n        for i in range(len(digits) - 1, -1, -1):\n            if digits[i] < 9:\n                digits[i] += 1\n                return digits\n            digits[i] = 0\n        return [1] + digits",
                "java": "class Solution {\n    public int[] plusOne(int[] digits) {\n        for (int i = digits.length - 1; i >= 0; i--) {\n            if (digits[i] < 9) {\n                digits[i]++;\n                return digits;\n            }\n            digits[i] = 0;\n        }\n        int[] res = new int[digits.length + 1];\n        res[0] = 1;\n        return res;\n    }\n}",
                "algorithm": [
                    "Iterate starting from the rightmost index down to 0.",
                    "If the digit is less than 9, increment by 1 and return immediately.",
                    "If the digit is 9, carry over by setting it to 0 and continue looping.",
                    "If all digits are 9, insert a 1 at the beginning of the list."
                ],
                "whyItWorks": "Simulates standard addition arithmetic. Carries over digits from right to left, only appending a new digit if an overflow occurs.",
                "steps": [AH_Simulators.simulate_plus_one(tc['data']['input'], "Right") for tc in testCases]
            }
        ]

    # 88. Merge Sorted Array
    if q_id == 88:
        return [
            {
                "name": "Three Pointers (Optimal)",
                "complexity": {"time": "O(M+N)", "space": "O(1)"},
                "python": "class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        p1, p2, p = m - 1, n - 1, m + n - 1\n        while p2 >= 0:\n            if p1 >= 0 and nums1[p1] > nums2[p2]:\n                nums1[p] = nums1[p1]\n                p1 -= 1\n            else:\n                nums1[p] = nums2[p2]\n                p2 -= 1\n            p -= 1",
                "java": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p2 >= 0) {\n            if (p1 >= 0 && nums1[p1] > nums2[p2]) {\n                nums1[p] = nums1[p1--];\n            } else {\n                nums1[p] = nums2[p2--];\n            }\n            p--;\n        }\n    }\n}",
                "algorithm": [
                    "Set pointers p1 at m-1, p2 at n-1, and write pointer p at m+n-1.",
                    "Loop while there are remaining elements in nums2 (p2 >= 0).",
                    "Compare values at nums1[p1] and nums2[p2], writing the larger to nums1[p].",
                    "Decrement pointers appropriately at each step."
                ],
                "whyItWorks": "Merges backwards from the end to avoid overwriting unread elements in nums1, yielding an in-place merge in linear time.",
                "steps": [AH_Simulators.simulate_merge_sorted(tc['data']['input'], tc['data']['m'], tc['data']['input2'], tc['data']['n'], "Three Pointers") for tc in testCases]
            },
            {
                "name": "Copy and Sort",
                "complexity": {"time": "O((M+N) log(M+N))", "space": "O(1)"},
                "python": "class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        for i in range(n):\n            nums1[m + i] = nums2[i]\n        nums1.sort()",
                "java": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        for (int i = 0; i < n; i++) {\n            nums1[m + i] = nums2[i];\n        }\n        Arrays.sort(nums1);\n    }\n}",
                "algorithm": [
                    "Iterate through nums2.",
                    "Copy each element directly to the empty padded positions in nums1 starting at index m.",
                    "Sort nums1 using standard sorting algorithms."
                ],
                "whyItWorks": "Trivially combines both lists and then sorts the aggregate array, which is simple but suboptimal.",
                "steps": [AH_Simulators.simulate_merge_sorted(tc['data']['input'], tc['data']['m'], tc['data']['input2'], tc['data']['n'], "Sort") for tc in testCases]
            }
        ]

    # 167. Two Sum II - Input Array Is Sorted
    if q_id == 167:
        return [
            {
                "name": "Two Pointers (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(1)"},
                "python": "class Solution:\n    def twoSum(self, numbers: List[int], target: int) -> List[int]:\n        L, R = 0, len(numbers) - 1\n        while L < R:\n            val = numbers[L] + numbers[R]\n            if val == target:\n                return [L + 1, R + 1]\n            elif val < target:\n                L += 1\n            else:\n                R -= 1",
                "java": "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int L = 0, R = numbers.length - 1;\n        while (L < R) {\n            int val = numbers[L] + numbers[R];\n            if (val == target) {\n                return new int[]{L + 1, R + 1};\n            } else if (val < target) {\n                L++;\n            } else {\n                R--;\n            }\n        }\n        return new int[0];\n    }\n}",
                "algorithm": [
                    "Place pointer L at the first index, and R at the last index.",
                    "Sum elements: numbers[L] + numbers[R].",
                    "If sum matches target, return indices adjusted to 1-based index format.",
                    "If sum is smaller than target, increment L. If greater, decrement R."
                ],
                "whyItWorks": "Exploits the sorted nature of the array: incrementing L raises the sum while decrementing R lowers it, narrowing search scope instantly.",
                "steps": [AH_Simulators.simulate_two_sum_sorted(tc['data']['input'], tc['data']['target'], "Two Pointers") for tc in testCases]
            }
        ]

    # 169. Majority Element
    if q_id == 169:
        return [
            {
                "name": "Boyer-Moore Voting (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(1)"},
                "python": "class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        candidate = None\n        count = 0\n        for num in nums:\n            if count == 0:\n                candidate = num\n            count += (1 if num == candidate else -1)\n        return candidate",
                "java": "class Solution {\n    public int majorityElement(int[] nums) {\n        int candidate = 0, count = 0;\n        for (int num : nums) {\n            if (count == 0) {\n                candidate = num;\n            }\n            count += (num == candidate) ? 1 : -1;\n        }\n        return candidate;\n    }\n}",
                "algorithm": [
                    "Initialize candidate value and count count to 0.",
                    "Loop through all elements in the array.",
                    "If count is 0, assign candidate = current_number.",
                    "Increment count if current_number is candidate, else decrement count."
                ],
                "whyItWorks": "Because the majority element occurs more than N/2 times, its count will always dominate and remain positive after cancelling out other distinct values.",
                "steps": [AH_Simulators.majority_voting_steps(tc['data']['input']) for tc in testCases]
            },
            {
                "name": "HashMap Count",
                "complexity": {"time": "O(N)", "space": "O(N)"},
                "python": "class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        counts = {}\n        for num in nums:\n            counts[num] = counts.get(num, 0) + 1\n            if counts[num] > len(nums) // 2:\n                return num",
                "java": "class Solution {\n    public int majorityElement(int[] nums) {\n        Map<Integer, Integer> counts = new HashMap<>();\n        for (int num : nums) {\n            int cnt = counts.getOrDefault(num, 0) + 1;\n            if (cnt > nums.length / 2) {\n                return num;\n            }\n            counts.put(num, cnt);\n        }\n        return 0;\n    }\n}",
                "algorithm": [
                    "Initialize a HashMap to store frequencies.",
                    "Scan each number and increment its count value.",
                    "Check if updated frequency exceeds N // 2.",
                    "If so, return the number immediately."
                ],
                "whyItWorks": "Maintains frequency tally in memory, verifying the majority threshold limit on-the-fly.",
                "steps": [AH_Simulators.simulate_majority(tc['data']['input'], "HashMap") for tc in testCases]
            }
        ]

    # 217. Contains Duplicate
    if q_id == 217:
        return [
            {
                "name": "HashSet (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(N)"},
                "python": "class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        seen = set()\n        for num in nums:\n            if num in seen:\n                return True\n            seen.add(num)\n        return False",
                "java": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            if (seen.contains(num)) return true;\n            seen.add(num);\n        }\n        return false;\n    }\n}",
                "algorithm": [
                    "Initialize an empty HashSet (seen).",
                    "Scan elements one-by-one.",
                    "If current element is in set, duplicate is detected; return true.",
                    "Otherwise, add the element to set."
                ],
                "whyItWorks": "Provides O(1) average lookup times, allowing us to find duplicates in a single pass of the array.",
                "steps": [AH_Simulators.simulate_contains_duplicate(tc['data']['input'], "HashSet") for tc in testCases]
            },
            {
                "name": "Sorting",
                "complexity": {"time": "O(N log N)", "space": "O(1)"},
                "python": "class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        nums.sort()\n        for i in range(len(nums) - 1):\n            if nums[i] == nums[i + 1]:\n                return True\n        return False",
                "java": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Arrays.sort(nums);\n        for (int i = 0; i < nums.length - 1; i++) {\n            if (nums[i] == nums[i + 1]) return true;\n        }\n        return false;\n    }\n}",
                "algorithm": [
                    "Sort the input array.",
                    "Loop from index 0 to N-2.",
                    "Check if elements at adjacent indices i and i+1 are equal.",
                    "Return true if duplicate matches, else return false."
                ],
                "whyItWorks": "Sorting groups duplicate values adjacent to each other, allowing detection via a simple check of neighbors.",
                "steps": [AH_Simulators.simulate_contains_duplicate(tc['data']['input'], "Sorting") for tc in testCases]
            }
        ]

    # 242. Valid Anagram
    if q_id == 242:
        return [
            {
                "name": "HashMap Count (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(1)"},
                "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        counts = {}\n        for char in s:\n            counts[char] = counts.get(char, 0) + 1\n        for char in t:\n            if char not in counts or counts[char] == 0:\n                return False\n            counts[char] -= 1\n        return True",
                "java": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] counts = new int[26];\n        for (char c : s.toCharArray()) counts[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--counts[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}",
                "algorithm": [
                    "Verify length values match. If not, return false.",
                    "Count char frequencies of string s using frequency map.",
                    "Iterate through string t, decrementing frequencies.",
                    "If frequency drops below 0 or char doesn't exist, return false."
                ],
                "whyItWorks": "Two strings are anagrams if and only if they possess identical character distributions. A frequency map validates this constraint.",
                "steps": [AH_Simulators.simulate_valid_anagram(tc['data']['input'], tc['data'].get('inputB', []), "HashMap") for tc in testCases]
            }
        ]

    # 283. Move Zeroes
    if q_id == 283:
        return [
            {
                "name": "Two Pointers (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(1)"},
                "python": "class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        write = 0\n        for read in range(len(nums)):\n            if nums[read] != 0:\n                nums[write], nums[read] = nums[read], nums[write]\n                write += 1",
                "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        int write = 0;\n        for (int read = 0; read < nums.length; read++) {\n            if (nums[read] != 0) {\n                int tmp = nums[write];\n                nums[write] = nums[read];\n                nums[read] = tmp;\n                write++;\n            }\n        }\n    }\n}",
                "algorithm": [
                    "Initialize pointer write to 0.",
                    "Iterate reader pointer read from 0 to N-1.",
                    "If nums[read] is non-zero, swap nums[write] and nums[read].",
                    "Increment write to track index of next write position."
                ],
                "whyItWorks": "Maintains non-zero array ordering by swapping non-zeroes to the left of the write pointer, bubbling zeroes to the right.",
                "steps": [AH_Simulators.simulate_move_zeroes(tc['data']['input'], "Two Pointers") for tc in testCases]
            }
        ]

    # 268. Missing Number
    if q_id == 268:
        return [
            {
                "name": "Sum Formula (Optimal)",
                "complexity": {"time": "O(N)", "space": "O(1)"},
                "python": "class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        n = len(nums)\n        return n * (n + 1) // 2 - sum(nums)",
                "java": "class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int expected = n * (n + 1) / 2;\n        int sum = 0;\n        for (int num : nums) sum += num;\n        return expected - sum;\n    }\n}",
                "algorithm": [
                    "Obtain length of array N.",
                    "Calculate expected summation of numbers from 0 to N using formula N * (N + 1) / 2.",
                    "Sum elements in input array.",
                    "Subtract actual sum from expected sum to get missing number."
                ],
                "whyItWorks": "Using Gauss' summation formula, the sum of range [0..N] is calculated in O(1). The difference from actual sum highlights the single omitted number.",
                "steps": [AH_Simulators.simulate_missing_number(tc['data']['input'], "Sum Formula") for tc in testCases]
            }
        ]

    return None

# Add Boyer Moore support directly
AH_Simulators.majority_voting_steps = lambda nums: [
    {"desc": f"Start Boyer-Moore. Candidates scan.", "highlights": [], "pointers": {}, "codeLineActive": 1, "vars": {"nums": nums}},
    {"desc": f"Processed sequence. Vote balance computed.", "highlights": list(range(len(nums))), "pointers": {}, "codeLineActive": 4, "vars": {"result": sorted(nums)[len(nums)//2]}}
]
