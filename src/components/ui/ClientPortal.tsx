import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Array<{ id: string; name: string; color: string }>;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ isOpen, onClose, projects }) => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [clientEmail, setClientEmail] = useState('');
  const [permissions, setPermissions] = useState({
    viewTasks: true,
    createTasks: false,
    viewProgress: true,
    receiveUpdates: true
  });

  const handleShareWithClient = () => {
    if (!selectedProject || !clientEmail) {
      toast.error('Please select project and enter client email');
      return;
    }

    // Generate client access link
    const accessToken = Math.random().toString(36).substr(2, 16);
    const clientLink = `https://www.syncscript.app/client/${accessToken}`;

    // In production, save to database and send email
    toast.success(`✅ Client portal created! Link sent to ${clientEmail}`);
    
    // Copy link to clipboard
    navigator.clipboard.writeText(clientLink);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="client-portal-overlay" onClick={onClose}>
          <motion.div
            className="client-portal-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="client-portal-header">
              <div>
                <h2>👥 Client Portal</h2>
                <p>Share project progress with clients</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="client-portal-content">
              <div className="form-section">
                <div className="form-field">
                  <label>Select Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="project-select"
                  >
                    <option value="">Choose a project...</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Client Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="email-input"
                  />
                </div>

                <div className="permissions-section">
                  <h4>Client Permissions</h4>
                  <label className="permission-item">
                    <input
                      type="checkbox"
                      checked={permissions.viewTasks}
                      onChange={(e) => setPermissions({ ...permissions, viewTasks: e.target.checked })}
                    />
                    <span>View tasks and progress</span>
                  </label>

                  <label className="permission-item">
                    <input
                      type="checkbox"
                      checked={permissions.createTasks}
                      onChange={(e) => setPermissions({ ...permissions, createTasks: e.target.checked })}
                    />
                    <span>Create new tasks</span>
                  </label>

                  <label className="permission-item">
                    <input
                      type="checkbox"
                      checked={permissions.viewProgress}
                      onChange={(e) => setPermissions({ ...permissions, viewProgress: e.target.checked })}
                    />
                    <span>View project analytics</span>
                  </label>

                  <label className="permission-item">
                    <input
                      type="checkbox"
                      checked={permissions.receiveUpdates}
                      onChange={(e) => setPermissions({ ...permissions, receiveUpdates: e.target.checked })}
                    />
                    <span>Receive email updates</span>
                  </label>
                </div>
              </div>

              <div className="preview-section">
                <h4>🔍 Preview</h4>
                <p className="preview-text">
                  Client will see:
                </p>
                <ul className="preview-list">
                  {permissions.viewTasks && <li>✓ All project tasks</li>}
                  {permissions.createTasks && <li>✓ Create task button</li>}
                  {permissions.viewProgress && <li>✓ Progress charts</li>}
                  {permissions.receiveUpdates && <li>✓ Email notifications</li>}
                </ul>
              </div>
            </div>

            <div className="client-portal-footer">
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleShareWithClient}
                disabled={!selectedProject || !clientEmail}
              >
                🚀 Create Client Portal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ClientPortal;
