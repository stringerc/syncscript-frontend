# 🧬 IAOB: Synthetic Data Library

**Realistic Test Data for Edge Case Coverage**  
**Owner:** Synthetic Data Lab Engineer  
**Last Updated:** October 13, 2025

---

## 🎯 PURPOSE

Generate realistic, privacy-safe test data that exercises edge cases:
- Long text strings (RTL, CJK, emojis)
- Extreme numbers (999,999 points)
- Complex relationships (nested projects)
- Boundary conditions (empty, max, null)

---

## 📊 DATA GENERATORS

### **User Generator**

```typescript
export function generateTestUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `auth0|test-user-${i}`,
    email: `test${i}@syncscript-test.com`,
    name: names[i % names.length],
    created_at: faker.date.past().toISOString(),
    points: faker.number.int({ min: 0, max: 999999 }),
    level: Math.floor(faker.number.int({ min: 0, max: 999999 }) / 1000),
  }));
}

const names = [
  'John Doe',
  '李明',                          // Chinese
  'محمد أحمد',                    // Arabic (RTL)
  'José García-López',           // Spanish with accents
  'Müller-Östreicher',           // German with umlauts
  'Анна Петрова',                // Russian (Cyrillic)
  '佐藤 太郎',                    // Japanese
  'שרה לוי',                     // Hebrew (RTL)
  'Nguyễn Văn A',                // Vietnamese
  'Françoise Dupont-Martin',     // French with hyphens
];
```

---

### **Task Generator**

```typescript
export function generateTestTasks(count: number): Task[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `task_${uuid()}`,
    title: titles[i % titles.length],
    description: descriptions[i % descriptions.length],
    priority: (i % 5) + 1 as 1 | 2 | 3 | 4 | 5,
    energy_level: (i % 5) + 1 as 1 | 2 | 3 | 4 | 5,
    completed: i % 3 === 0, // 33% completed
    due_date: faker.date.future().toISOString(),
    user_id: 'auth0|test-user-0',
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  }));
}

const titles = [
  // Normal
  'Complete quarterly report',
  'Review pull requests',
  
  // Long (500 chars)
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  
  // RTL
  'مراجعة التقرير الربع سنوي',
  
  // CJK
  '四半期レポートを完成させる',
  
  // Emoji
  '🚀 Launch new feature 🎉',
  
  // Special chars
  'Fix "bug" in <component> & deploy',
  
  // German long word
  'Rindfleischetikettierungsüberwachung',
];
```

---

*Synthetic Data Owner: Synthetic Data Lab Engineer*  
*Status: Generators Ready*

