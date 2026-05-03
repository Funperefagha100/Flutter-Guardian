/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  challenge: string;
  hint: string;
}

export const LESSONS: Lesson[] = [
  {
    id: 'hello-world',
    title: 'Hello Flutter!',
    description: 'Learn the basic structure of a Flutter app.',
    initialCode: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My First App'),
        ),
        body: const Center(
          child: Text('Hello Flutter!'),
        ),
      ),
    );
  }
}`,
    challenge: 'Change the text from "Hello Flutter!" to "Welcome to FlutterGuardian!"',
    hint: 'Look for the Text() widget inside the Center() widget.',
  },
  {
    id: 'styling-text',
    title: 'Styling Text',
    description: 'Make your text pop with colors and fonts.',
    initialCode: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Cool Flutter App',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
          ),
        ),
      ),
    );
  }
}`,
    challenge: 'Change the font size to 40 and text color to Colors.red',
    hint: 'Modify the TextStyle widget properties.',
  },
  {
    id: 'columns-rows',
    title: 'Layouts: Columns & Rows',
    description: 'Learn how to stack widgets vertically and horizontally.',
    initialCode: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Item 1'),
            Text('Item 2'),
            Text('Item 3'),
          ],
        ),
      ),
    );
  }
}`,
    challenge: 'Add a Row inside the column and put two Icon widgets in it.',
    hint: 'Use the Icons.favorite icon.',
  }
];
