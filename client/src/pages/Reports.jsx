import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { FileText, ChevronRight, Upload } from 'lucide-react';
import { getRecords, FILE_BASE_URL } from '../services/api';

const Reports = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getRecords();
            // Filter only reports that have file URLs
            setRecords(data.filter(r => r.type === 'Report' && r.fileUrl));
        } catch (error) {
            console.error('Failed to fetch records', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="w-full animate-slide-up pr-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Medical Reports</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Access all your uploaded documents and test results.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : records.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
                        <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No reports found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">Uploaded reports will appear here. You can upload reports from the Dashboard.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {records.map((record) => (
                            <a
                                key={record.id}
                                href={`${FILE_BASE_URL}${record.fileUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{record.description}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                            <span>{record.bodyPart}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                            <span>{new Date(record.date).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                    <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Reports;
