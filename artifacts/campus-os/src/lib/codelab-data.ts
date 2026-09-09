export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type CodeProblem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  acceptance: string;
  solved: boolean;
  description: string;
  examples: string;
  constraints: string[];
  hints: string[];
  related: string[];
  starterCode: Record<string, string>;
  tests: { input: string; expected: string }[];
};

export type CompanyTrack = {
  name: string;
  initials: string;
  color: string;
  solved: number;
  total: number;
  focus: string;
  topics: string[];
};

export const codeProblems: CodeProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Map'],
    companies: ['Amazon', 'Microsoft', 'TechNova'],
    acceptance: '48.6%',
    solved: true,
    description: 'Given an array of integers and a target, return the indices of the two numbers that add up to the target. You may assume that each input has exactly one solution, and you may not use the same element twice.',
    examples: 'Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\n\nInput: nums = [3, 2, 4], target = 6\nOutput: [1, 2]',
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
    hints: ['As you scan the array, ask what complement you need to reach the target.', 'A map can remember values you have already seen in constant time.'],
    related: ['Contains Duplicate', '3Sum', 'Subarray Sum Equals K'],
    starterCode: {
      JavaScript: 'function twoSum(nums, target) {\n  // Return the indices of the matching pair.\n}',
      Python: 'def two_sum(nums, target):\n    # Return the indices of the matching pair.\n    pass',
      Java: 'class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    return new int[] {};\n  }\n}',
    },
    tests: [
      { input: '[2, 7, 11, 15], 9', expected: '[0, 1]' },
      { input: '[3, 2, 4], 6', expected: '[1, 2]' },
      { input: '[3, 3], 6', expected: '[0, 1]' },
    ],
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['Strings', 'Sliding Window'],
    companies: ['Google', 'Amazon', 'InnovateLabs'],
    acceptance: '37.9%',
    solved: false,
    description: 'Given a string, find the length of the longest substring without repeating characters. A substring is a contiguous sequence of characters within the string.',
    examples: 'Input: s = "abcabcbb"\nOutput: 3\nExplanation: "abc" is the longest substring.\n\nInput: s = "bbbbb"\nOutput: 1',
    constraints: ['0 ≤ s.length ≤ 5 × 10⁴', 's consists of English letters, digits, symbols and spaces.'],
    hints: ['Keep a moving window whose left edge only moves forward.', 'When a character repeats, jump the left edge past its previous position.'],
    related: ['Minimum Window Substring', 'Longest Repeating Character Replacement', 'Permutation in String'],
    starterCode: {
      JavaScript: 'function lengthOfLongestSubstring(s) {\n  // Return the maximum window length.\n}',
      Python: 'def length_of_longest_substring(s):\n    # Return the maximum window length.\n    pass',
      Java: 'class Solution {\n  public int lengthOfLongestSubstring(String s) {\n    return 0;\n  }\n}',
    },
    tests: [
      { input: '"abcabcbb"', expected: '3' },
      { input: '"bbbbb"', expected: '1' },
      { input: '""', expected: '0' },
    ],
  },
  {
    id: 'merge-k-lists',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topics: ['Linked List', 'Heap'],
    companies: ['Microsoft', 'Amazon', 'Google'],
    acceptance: '54.1%',
    solved: false,
    description: 'You are given an array of k linked lists, each linked list is sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.',
    examples: 'Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\n\nInput: lists = []\nOutput: []',
    constraints: ['k == lists.length', '0 ≤ k ≤ 10⁴', '0 ≤ lists[i].length ≤ 500', '-10⁴ ≤ Node.val ≤ 10⁴'],
    hints: ['What data structure gives you the smallest current head efficiently?', 'Each pop from the heap can expose one new candidate node.'],
    related: ['Merge Two Sorted Lists', 'Kth Largest Element in an Array', 'Find Median from Data Stream'],
    starterCode: {
      JavaScript: 'function mergeKLists(lists) {\n  // Return the merged sorted linked list.\n}',
      Python: 'def merge_k_lists(lists):\n    # Return the merged sorted linked list.\n    pass',
      Java: 'class Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    return null;\n  }\n}',
    },
    tests: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' },
      { input: '[]', expected: '[]' },
    ],
  },
  {
    id: 'level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topics: ['Trees', 'BFS'],
    companies: ['TechNova', 'Microsoft', 'Amazon'],
    acceptance: '69.4%',
    solved: true,
    description: 'Given the root of a binary tree, return the level order traversal of its nodes’ values. The traversal visits nodes from left to right, level by level.',
    examples: 'Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\nInput: root = []\nOutput: []',
    constraints: ['The number of nodes is in the range [0, 2000].', '-1000 ≤ Node.val ≤ 1000'],
    hints: ['A queue naturally models the order in which nodes should be visited.', 'Capture the queue length before processing each level.'],
    related: ['Binary Tree Zigzag Level Order Traversal', 'Maximum Depth of Binary Tree', 'Right Side View'],
    starterCode: {
      JavaScript: 'function levelOrder(root) {\n  // Return values grouped by depth.\n}',
      Python: 'def level_order(root):\n    # Return values grouped by depth.\n    pass',
      Java: 'class Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    return new ArrayList<>();\n  }\n}',
    },
    tests: [
      { input: '[3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
      { input: '[]', expected: '[]' },
    ],
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topics: ['Graphs', 'Topological Sort'],
    companies: ['Google', 'Microsoft', 'CloudStack'],
    acceptance: '47.8%',
    solved: false,
    description: 'There are a total of numCourses courses you have to take. Some courses have prerequisites. Return true if you can finish all courses, otherwise return false.',
    examples: 'Input: numCourses = 2, prerequisites = [[1,0]]\nOutput: true\n\nInput: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false',
    constraints: ['1 ≤ numCourses ≤ 2000', '0 ≤ prerequisites.length ≤ 5000', 'prerequisites[i].length == 2'],
    hints: ['A cycle in the prerequisite graph makes completion impossible.', 'Try tracking the indegree of each course while removing courses with no prerequisites.'],
    related: ['Course Schedule II', 'Alien Dictionary', 'Graph Valid Tree'],
    starterCode: {
      JavaScript: 'function canFinish(numCourses, prerequisites) {\n  // Return whether every course can be completed.\n}',
      Python: 'def can_finish(num_courses, prerequisites):\n    # Return whether every course can be completed.\n    pass',
      Java: 'class Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    return false;\n  }\n}',
    },
    tests: [
      { input: '2, [[1,0]]', expected: 'true' },
      { input: '2, [[1,0],[0,1]]', expected: 'false' },
    ],
  },
];

export const companyTracks: CompanyTrack[] = [
  { name: 'TechNova', initials: 'TN', color: 'company-indigo', solved: 18, total: 28, focus: 'Campus hiring sprint', topics: ['Arrays', 'Trees', 'SQL'] },
  { name: 'CloudStack', initials: 'CS', color: 'company-sky', solved: 11, total: 24, focus: 'Backend foundations', topics: ['Graphs', 'APIs', 'DBMS'] },
  { name: 'InnovateLabs', initials: 'IL', color: 'company-violet', solved: 9, total: 20, focus: 'Product engineering', topics: ['Strings', 'React', 'DSA'] },
  { name: 'Amazon', initials: 'AM', color: 'company-orange', solved: 22, total: 42, focus: 'SDE intern loop', topics: ['Arrays', 'Heap', 'BFS'] },
  { name: 'Google', initials: 'G', color: 'company-red', solved: 14, total: 35, focus: 'Algorithmic thinking', topics: ['Graphs', 'Trees', 'DP'] },
  { name: 'Microsoft', initials: 'MS', color: 'company-blue', solved: 17, total: 31, focus: 'Core problem solving', topics: ['Linked List', 'BFS', 'Hash Map'] },
];

export const topicProgress = [
  { name: 'Arrays', solved: 32, total: 36, confidence: 90 },
  { name: 'Strings', solved: 18, total: 27, confidence: 74 },
  { name: 'Trees', solved: 13, total: 24, confidence: 55 },
  { name: 'Graphs', solved: 9, total: 21, confidence: 43 },
  { name: 'Dynamic Programming', solved: 6, total: 19, confidence: 31 },
];

export const mentorResponses: Record<string, string> = {
  hint: 'Start by naming the state you need to remember while scanning. For this problem, the useful question is: “what information would make the next decision constant-time?” Try writing that invariant before reaching for code.',
  concept: 'This is a classic sliding-window pattern. Maintain a valid interval, expand the right edge, and move the left edge only when the invariant breaks. Each character enters and leaves the window at most once.',
  approach: 'Your direction is promising. Before optimizing, test the approach against an empty input, repeated values, and the smallest valid case. If a nested scan appears, consider whether a map or queue can preserve the prior work.',
  related: 'A focused next step would be Minimum Window Substring. It keeps the same moving-window instinct but adds a frequency requirement, which is a useful bridge toward harder string problems.',
};