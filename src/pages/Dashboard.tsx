import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, X, User, Mail, Phone, DollarSign, Package, CheckCircle, FileText, Calendar, Receipt } from 'lucide-react';

interface PackageItem {
  name: string;
  price: number;
  selected: boolean;
  priceOption: 'preset' | 'custom';
  customDescription?: string;
  years?: number;
}

interface PackagePresets {
  [key: string]: { label: string; price: number }[];
}

const packagePresets: PackagePresets = {
  'Penetration Testing': [
    { label: 'Basic Assessment', price: 350000 },
    { label: 'Standard Pentest', price: 850000 },
    { label: 'Advanced Audit', price: 1800000 },
    { label: 'Enterprise Audit', price: 3500000 },
  ],
  'Smart Contract Audit': [
    { label: 'Basic Audit', price: 1500000 },
    { label: 'Standard Audit', price: 2800000 },
    { label: 'Enterprise Audit', price: 5000000 },
  ],
  'Recon Reports': [
    { label: 'Pro Recon', price: 150000 },
    { label: 'Standard Recon', price: 250000 },
    { label: 'Deep Recon', price: 450000 },
  ],
  'Web Development': [
    { label: 'Premium Starter', price: 250000 },
    { label: 'Business Website', price: 550000 },
    { label: 'Pro Platform', price: 1200000 },
    { label: 'Enterprise E-comm', price: 2500000 },
  ],
  'App Development': [
    { label: 'Secure MVP', price: 1800000 },
    { label: 'Standard Hardened App', price: 4500000 },
    { label: 'Pro Architecture', price: 8000000 },
    { label: 'Fintech Platform', price: 15000000 },
  ],
  'Cloud Infrastructure': [
    { label: 'Cloud Setup', price: 450000 },
    { label: 'Cost Optimization', price: 850000 },
    { label: 'Advanced DevOps', price: 1500000 },
  ],
  'Custom Scripts': [
    { label: 'Pro Scripting', price: 150000 },
    { label: 'Standard System', price: 250000 },
    { label: 'Advanced Worker', price: 450000 },
  ],
  'AI Agent & Automation': [
    { label: 'Implementation', price: 600000 },
    { label: 'RAG System', price: 1200000 },
    { label: 'Workforce Suite', price: 2800000 },
    { label: 'Custom ML Model', price: 5000000 },
  ],
  'UI & Frontend Design': [
    { label: 'Basic Design', price: 250000 },
    { label: 'Standard Brand System', price: 550000 },
    { label: 'Pro Motion Design', price: 850000 },
    { label: 'Full Brand Production', price: 1500000 },
  ],
  'Maintenance': [
    { label: 'Website Baseline', price: 150000 },
    { label: 'App Management', price: 400000 },
    { label: 'System Guard', price: 250000 },
    { label: 'AI Stewardship', price: 500000 },
  ],
  'Compliance as a Service': [
    { label: 'Basic Audit', price: 500000 },
    { label: 'Full Framework', price: 1200000 },
    { label: 'Elite Governance', price: 2500000 },
  ],
  'Retainer Plans': [
    { label: 'Basic Partner', price: 300000 },
    { label: 'Business Priority', price: 750000 },
    { label: 'Elite Retainer', price: 1500000 },
  ],
};

interface Transaction {
  id: string;
  sender_name: string;
  sender_email: string;
  phone_number?: string;
  amount: number;
  currency: string;
  packages_bought?: string[];
  payment_reference: string;
  payment_status: string;
  payment_method?: string;
  receipt_url?: string;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole(user?.id);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [packages, setPackages] = useState<PackageItem[]>([
    { name: 'Penetration Testing', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Smart Contract Audit', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Recon Reports', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Web Development', price: 0, selected: false, priceOption: 'preset' },
    { name: 'App Development', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Cloud Infrastructure', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Custom Scripts', price: 0, selected: false, priceOption: 'preset' },
    { name: 'AI Agent & Automation', price: 0, selected: false, priceOption: 'preset' },
    { name: 'UI & Frontend Design', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Maintenance', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Compliance as a Service', price: 0, selected: false, priceOption: 'preset' },
    { name: 'Retainer Plans', price: 0, selected: false, priceOption: 'preset' },
  ]);
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    phone_number: '',
    address: '',
    payment_reference: '',
    payment_status: 'pending',
    payment_method: '',
  });

  useEffect(() => {
    if (!roleLoading && user) {
      fetchTransactions();
    }
  }, [user, isAdmin, roleLoading]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handlePackageToggle = (index: number) => {
    const newPackages = [...packages];
    newPackages[index].selected = !newPackages[index].selected;
    if (!newPackages[index].selected) {
      newPackages[index].price = 0;
      newPackages[index].priceOption = 'preset';
    }
    setPackages(newPackages);
  };

  const handlePackagePriceChange = (index: number, price: string) => {
    const newPackages = [...packages];
    newPackages[index].price = parseFloat(price) || 0;
    setPackages(newPackages);
  };

  const handlePriceOptionChange = (index: number, option: 'preset' | 'custom') => {
    const newPackages = [...packages];
    newPackages[index].priceOption = option;
    if (option === 'preset') {
      newPackages[index].price = 0;
    }
    setPackages(newPackages);
  };

  const handlePresetPriceSelect = (index: number, price: string) => {
    const newPackages = [...packages];
    newPackages[index].price = parseFloat(price) || 0;
    setPackages(newPackages);
  };

  const handleCustomDescriptionChange = (index: number, description: string) => {
    const newPackages = [...packages];
    newPackages[index].customDescription = description;
    setPackages(newPackages);
  };

  const handleYearsChange = (index: number, years: number) => {
    const newPackages = [...packages];
    newPackages[index].years = years;
    setPackages(newPackages);
  };

  const calculateTotalAmount = () => {
    return packages
      .filter(pkg => pkg.selected)
      .reduce((sum, pkg) => sum + pkg.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      toast({
        title: 'Unauthorized',
        description: 'Only admins can add transactions',
        variant: 'destructive'
      });
      return;
    }

    try {
      const selectedPackages = packages
        .filter(pkg => pkg.selected)
        .map(pkg => {
          let packageString = '';
          if (pkg.priceOption === 'custom' && pkg.customDescription) {
            packageString = `${pkg.name} - ${pkg.customDescription}`;
          } else {
            packageString = pkg.name;
          }

          // Add years for Domain and Cyber Security packages
          if ((pkg.name === 'Domain' || pkg.name === 'Cyber Security') && pkg.years) {
            packageString += ` (${pkg.years} year${pkg.years > 1 ? 's' : ''})`;
          }

          return `${packageString} (₦${pkg.price.toLocaleString()})`;
        });

      if (selectedPackages.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Please select at least one package',
          variant: 'destructive'
        });
        return;
      }

      let receiptUrl = null;

      // Upload file if provided
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('transaction-files')
          .upload(filePath, uploadedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('transaction-files')
          .getPublicUrl(filePath);

        receiptUrl = publicUrl;
      }

      const totalAmount = calculateTotalAmount();

      const { error } = await supabase.from('transactions').insert({
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        phone_number: formData.phone_number || null,
        address: formData.address || null,
        amount: totalAmount,
        packages_bought: selectedPackages,
        payment_reference: formData.payment_reference,
        payment_status: formData.payment_status,
        payment_method: formData.payment_method || null,
        receipt_url: receiptUrl
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Transaction added successfully'
      });

      // Reset form
      setFormData({
        sender_name: '',
        sender_email: '',
        phone_number: '',
        address: '',
        payment_reference: '',
        payment_status: 'pending',
        payment_method: '',
      });
      setPackages(packages.map(pkg => ({ ...pkg, selected: false, price: 0, priceOption: 'preset' })));
      setUploadedFile(null);

      setIsDialogOpen(false);
      fetchTransactions();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Admin Dashboard watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div className="text-[13vw] font-bold opacity-[0.04] bg-gradient-to-br from-primary via-primary-glow to-accent bg-clip-text text-transparent rotate-[-12deg] whitespace-nowrap tracking-widest">
          ADMIN DASHBOARD
        </div>
      </div>

      {/* Tech circuit pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {isAdmin ? 'Admin Dashboard' : 'My Transactions'}
              </h1>
              <p className="text-muted-foreground">
                {isAdmin
                  ? 'Manage all client transactions'
                  : 'View your transaction history'}
              </p>
            </div>
            {isAdmin && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="fixed bottom-8 right-8 z-50 shadow-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl transition-shadow">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sender_name">Client Name *</Label>
                        <Input
                          id="sender_name"
                          required
                          value={formData.sender_name}
                          onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sender_email">Email *</Label>
                        <Input
                          id="sender_email"
                          type="email"
                          required
                          value={formData.sender_email}
                          onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone_number">Phone Number *</Label>
                        <Input
                          id="phone_number"
                          required
                          value={formData.phone_number}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="Client address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Package Selected *</Label>
                      <div className="space-y-3 p-4 glass rounded-lg">
                        {packages.map((pkg, index) => (
                          <div key={pkg.name} className="space-y-2">
                            <div className="flex items-center gap-4">
                              <Checkbox
                                id={`pkg-${index}`}
                                checked={pkg.selected}
                                onCheckedChange={() => handlePackageToggle(index)}
                              />
                              <Label htmlFor={`pkg-${index}`} className="flex-1 cursor-pointer font-medium">
                                {pkg.name}
                              </Label>
                            </div>

                            {pkg.selected && (
                              <div className="ml-9 space-y-3 p-3 bg-background/50 rounded-lg border border-border/50">
                                {/* Price Option Toggle */}
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={pkg.priceOption === 'preset' ? 'default' : 'outline'}
                                    onClick={() => handlePriceOptionChange(index, 'preset')}
                                    className="flex-1"
                                  >
                                    Preset Prices
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={pkg.priceOption === 'custom' ? 'default' : 'outline'}
                                    onClick={() => handlePriceOptionChange(index, 'custom')}
                                    className="flex-1"
                                  >
                                    Custom Price
                                  </Button>
                                </div>

                                {/* Preset Dropdown */}
                                {pkg.priceOption === 'preset' && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Select Package Type</Label>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                                      value={pkg.price || ''}
                                      onChange={(e) => handlePresetPriceSelect(index, e.target.value)}
                                      required
                                    >
                                      <option value="">Select a package...</option>
                                      {packagePresets[pkg.name]?.map((preset) => (
                                        <option key={preset.label} value={preset.price}>
                                          {preset.label} - ₦{preset.price.toLocaleString()}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}

                                {/* Custom Price Input */}
                                {pkg.priceOption === 'custom' && (
                                  <div className="space-y-3">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Package Description</Label>
                                      <Input
                                        type="text"
                                        placeholder="e.g., Custom E-commerce with Payment Gateway"
                                        className="mt-1"
                                        value={pkg.customDescription || ''}
                                        onChange={(e) => handleCustomDescriptionChange(index, e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Negotiated Price</Label>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-medium">₦</span>
                                        <Input
                                          type="number"
                                          placeholder="Enter custom price"
                                          className="flex-1"
                                          value={pkg.price || ''}
                                          onChange={(e) => handlePackagePriceChange(index, e.target.value)}
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Years Selection for Domain and Cyber Security */}
                                {(pkg.name === 'Domain' || pkg.name === 'Cyber Security') && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Subscription Duration (Years)</Label>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                                      value={pkg.years || ''}
                                      onChange={(e) => handleYearsChange(index, parseInt(e.target.value))}
                                      required
                                    >
                                      <option value="">Select years...</option>
                                      <option value="1">1 Year</option>
                                      <option value="2">2 Years</option>
                                      <option value="3">3 Years</option>
                                      <option value="4">4 Years</option>
                                      <option value="5">5 Years</option>
                                    </select>
                                  </div>
                                )}

                                {/* Display Selected Price */}
                                {pkg.price > 0 && (
                                  <div className="text-right text-sm font-semibold text-accent">
                                    Selected: ₦{pkg.price.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="pt-3 border-t border-border mt-3">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-accent">₦{calculateTotalAmount().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div>
                      <Label htmlFor="file_upload">Upload Receipt/Document</Label>
                      <div className="mt-2">
                        <input
                          id="file_upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx"
                        />
                        <label
                          htmlFor="file_upload"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors glass"
                        >
                          <Upload className="h-5 w-5" />
                          <span className="text-sm">
                            {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                          </span>
                        </label>
                        {uploadedFile && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Selected: {uploadedFile.name}</span>
                            <button
                              type="button"
                              onClick={() => setUploadedFile(null)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="payment_reference">Payment Reference *</Label>
                        <Input
                          id="payment_reference"
                          required
                          value={formData.payment_reference}
                          onChange={(e) => setFormData({ ...formData, payment_reference: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment_status">Payment Status *</Label>
                        <select
                          id="payment_status"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={formData.payment_status}
                          onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                        >
                          <option value="pending">Pending</option>
                          <option value="uncomplete">Uncomplete</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="payment_method">Payment Method</Label>
                        <Input
                          id="payment_method"
                          placeholder="e.g., Bank Transfer, Cash, Card"
                          value={formData.payment_method}
                          onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                      Save Transaction
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No transactions found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead><User className="h-4 w-4" /></TableHead>
                        <TableHead><Mail className="h-4 w-4" /></TableHead>
                        {isAdmin && <TableHead><Phone className="h-4 w-4" /></TableHead>}
                        <TableHead><DollarSign className="h-4 w-4" /></TableHead>
                        <TableHead><Package className="h-4 w-4" /></TableHead>
                        <TableHead><CheckCircle className="h-4 w-4" /></TableHead>
                        <TableHead><FileText className="h-4 w-4" /></TableHead>
                        <TableHead><Calendar className="h-4 w-4" /></TableHead>
                        {isAdmin && <TableHead><Receipt className="h-4 w-4" /></TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.sender_name}</TableCell>
                          <TableCell>{transaction.sender_email}</TableCell>
                          {isAdmin && <TableCell>{transaction.phone_number || '-'}</TableCell>}
                          <TableCell>
                            {transaction.currency} {transaction.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {transaction.packages_bought?.join(', ') || '-'}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${transaction.payment_status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : transaction.payment_status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : transaction.payment_status === 'uncomplete'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {transaction.payment_status}
                            </span>
                          </TableCell>
                          <TableCell>{transaction.payment_reference}</TableCell>
                          <TableCell>
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              {transaction.receipt_url ? (
                                <a
                                  href={transaction.receipt_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  View
                                </a>
                              ) : '-'}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
