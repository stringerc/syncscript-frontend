import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface APIDocsProps {
  isOpen: boolean;
  onClose: () => void;
}

const APIDocs: React.FC<APIDocsProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('tasks');

  const endpoints = {
    tasks: {
      name: 'Tasks API',
      baseUrl: '/api/tasks',
      methods: [
        {
          method: 'GET',
          endpoint: '/api/tasks',
          description: 'Get all tasks',
          auth: 'Required',
          response: '{ data: { tasks: Task[] } }'
        },
        {
          method: 'POST',
          endpoint: '/api/tasks',
          description: 'Create new task',
          auth: 'Required',
          body: '{ title: string, priority: number, ... }',
          response: '{ task: Task }'
        },
        {
          method: 'PUT',
          endpoint: '/api/tasks/:id',
          description: 'Update task',
          auth: 'Required',
          response: '{ task: Task }'
        },
        {
          method: 'DELETE',
          endpoint: '/api/tasks/:id',
          description: 'Delete task',
          auth: 'Required',
          response: '{ message: string }'
        }
      ]
    },
    energy: {
      name: 'Energy API',
      baseUrl: '/api/energy',
      methods: [
        {
          method: 'GET',
          endpoint: '/api/energy',
          description: 'Get energy logs',
          auth: 'Required',
          response: '{ data: { logs: EnergyLog[] } }'
        },
        {
          method: 'POST',
          endpoint: '/api/energy',
          description: 'Log energy level',
          auth: 'Required',
          body: '{ energy_level: number, notes?: string }',
          response: '{ log: EnergyLog }'
        }
      ]
    },
    ai: {
      name: 'AI API',
      baseUrl: '/api/ai',
      methods: [
        {
          method: 'POST',
          endpoint: '/api/ai/parse-task',
          description: 'Parse natural language to task',
          auth: 'Required',
          body: '{ input: string }',
          response: '{ task: ParsedTask }'
        },
        {
          method: 'POST',
          endpoint: '/api/ai/breakdown-task',
          description: 'Break down complex task',
          auth: 'Required',
          body: '{ title: string, description?: string }',
          response: '{ breakdown: TaskBreakdown }'
        }
      ]
    }
  };

  if (!isOpen) return null;

  const currentEndpoint = endpoints[selectedEndpoint as keyof typeof endpoints];

  return (
    <div className="api-docs-overlay" onClick={onClose}>
      <motion.div
        className="api-docs-modal"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="api-docs-header">
          <h2>📚 API Documentation</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="api-docs-layout">
          <div className="api-sidebar">
            <h3>Endpoints</h3>
            {Object.keys(endpoints).map(key => (
              <button
                key={key}
                className={`endpoint-btn ${selectedEndpoint === key ? 'active' : ''}`}
                onClick={() => setSelectedEndpoint(key)}
              >
                {endpoints[key as keyof typeof endpoints].name}
              </button>
            ))}
          </div>

          <div className="api-content">
            <h2>{currentEndpoint.name}</h2>
            <p className="base-url">Base URL: <code>{currentEndpoint.baseUrl}</code></p>

            <div className="methods-list">
              {currentEndpoint.methods.map((method, idx) => (
                <div key={idx} className="method-card">
                  <div className="method-header">
                    <span className={`method-badge ${method.method.toLowerCase()}`}>
                      {method.method}
                    </span>
                    <code className="endpoint-path">{method.endpoint}</code>
                  </div>

                  <p className="method-description">{method.description}</p>

                  <div className="method-details">
                    <div className="detail-item">
                      <strong>Authentication:</strong> {method.auth}
                    </div>

                    {method.body && (
                      <div className="detail-item">
                        <strong>Request Body:</strong>
                        <pre><code>{method.body}</code></pre>
                      </div>
                    )}

                    <div className="detail-item">
                      <strong>Response:</strong>
                      <pre><code>{method.response}</code></pre>
                    </div>
                  </div>

                  <div className="example-section">
                    <strong>Example:</strong>
                    <pre className="code-example">
{`curl -X ${method.method} \\
  https://api.syncscript.app${method.endpoint} \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  ${method.body ? `-d '${method.body}'` : ''}`}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default APIDocs;
